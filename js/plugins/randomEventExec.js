/*: ja
*
*  @plugindesc ランダムな実行をいい感じにしてくれるプラグイン
*  @author karekusa
*
*  @target MZ
*
*  @command commonEventRandomExecuter
*   @text ランダムに実行するプラグイン
*
*  @arg commonEventNumber
*   @text コモンイベントの番号
*   @type common_event
*
*  @help
*  インデントが0ではないもの(｢条件分岐:スクリプト:false ~ 分岐終了｣などの
*  内側で開始位置｢◆｣がちょっと右にずれてる要素たち)
*  の連続してるものを1ブロックと捉えて複数ブロックの中からランダムに実行をさせるプラグイン
*  1ブロックの最初の行が注釈で 'weight: 5' と同じフォーマットの場合のみ重みがつく
*
*  このスクリプトを再配布する場合は一声ください｡
*
*  想定問答
*
*  > なんで条件分岐の想定なの?
*
*  > 条件分岐を見ているわけじゃなくて､インデントが右に1つ寄っていたらOK
*  > でも実行されるような文章を書くとランダムな実行前に1回実行されちゃうから気をつけてね
*
*  version: 0.8.1
*/
(() => {
    'use strict';
    PluginManager.registerCommand('randomEventExec', 'commonEventRandomExecuter', (args) => {
        const commonEvent = $dataCommonEvents[args.commonEventNumber];
        if (commonEvent == null || commonEvent.list.length < 1) {
            throw new ReferenceError("COMMON_EVENT_ERROR / コモンイベントの指定方法がおかしいです");
        }
        const commands = commonEvent.list;
        const anonyCommands = parseAnonyCommands(commands);
        if (anonyCommands.length <= 0) {
            throw new ReferenceError("NO_RANDOM_EXECUTABLE / 指定されたコモンイベントにランダム実行できるブロックがありません");
        }
        const weights = getAnonyWeights(anonyCommands);
        const stackedWeights = weights.slice(1).reduce((arr, weight) => {
            return [...arr, arr[arr.length - 1] + weight];
        }, [weights[0] - 1]);
        // 全ての要素のweightが0の場合はwarnだけ出す
        if (stackedWeights[stackedWeights.length - 1] < 0) {
            console.warn('RANDOM_EVENT_EXEC_WARN: ランダム実行する要素がありません');
            return;
        }
        const pickedWeightedIndex = Math.round(Math.random() * stackedWeights[stackedWeights.length - 1]);
        let targetIndex = binSearch(pickedWeightedIndex, stackedWeights);
        while (weights[targetIndex] <= 0) {
            // 当該の重みが0のときはその右隣が本来選ばれるべき値
            targetIndex++;
            // 最終の要素の場合は最初の要素が該当する
            if (targetIndex >= weights.length) {
                targetIndex = 0;
            }
        }
        // indexエラー回避
        // 範囲の指定は数直線ライクに
        if (!(0 <= targetIndex && targetIndex < anonyCommands.length)) {
            console.warn('RANDOM_EVENT_EXEC_WARN: ランダム実行する要素がありません');
            return;
        }
        $gameMap._interpreter.setupChild(anonyCommands[targetIndex], commonEvent.id);
    });
    function parseAnonyCommands(commands) {
        // return用の配列
        const anonyCommands = [];
        // -1スタートなのは 0 - 1 = -1を成立させるため
        let last0IndentIndex = -1;
        commands.forEach((c, i) => {
            if (c.indent === 0) {
                if (last0IndentIndex !== i - 1) {
                    anonyCommands.push(commands.slice(last0IndentIndex + 1, i));
                }
                last0IndentIndex = i;
            }
        });
        return anonyCommands;
    }
    function getAnonyWeights(commands) {
        return commands.map((list) => {
            // code 108 は コメント 
            if (list[0].code === 108 &&
                list[0].parameters.length >= 0) {
                const paramsFirst = list[0].parameters[0];
                // string型だろうけど､anyなので型判定
                if (typeof paramsFirst == 'string') {
                    // format 'weight: 1' に適していた場合はその値を使う
                    // 負の数は強制的に正の数として判定する
                    const match = paramsFirst.match(/^weight ?: ?-?(\d+)/);
                    // matchに成功した場合はそのままparseして返す
                    if (match !== null) {
                        return Number(match[1]);
                    }
                }
            }
            // デフォルト値は1
            return 1;
        });
    }
    function binSearch(target, array, left = 0, right = array.length - 1) {
        if (left == right) {
            return left;
        }
        // 中央位置
        const middle = Math.floor((left + right) / 2);
        if (target > array[middle]) {
            // 検索対象は後ろ半分
            left = middle + 1;
            return binSearch(target, array, left, right);
        }
        // 検索対象は前半分
        right = middle;
        return binSearch(target, array, left, right);
    }
})();
