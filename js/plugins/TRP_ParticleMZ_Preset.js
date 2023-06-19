//=============================================================================
// TRP_ParticlePreset.js
//=============================================================================
/*:
 * @target MZ
 * @base TRP_ParticleMZ
 * @plugindesc パーティクルプリセットデータ
 * @help
 * 【更新履歴】
 * 1.07 2022/1/9   iOSでの動作不具合修正
 * 1.06 2021/6/1  コマンドのデフォルト値変更
 * 1.00 2021/4/10 初版。
 *
 * aura_bp <対象:character> ＠キャラ:青白い粒子と集中線拡散
 * aura_bp2 <対象:character> ＠キャラ:青白いサークル拡大
 * aura_static_b <対象:character> ＠キャラ:もやもやのオーラ
 * black_particle_w <対象:weather> ＠天候:黒いパーティクル
 * blizard_w <対象:weather> ＠天候:吹雪
 * bubble_c <対象:character> ＠キャラ:キャラを包む泡。attach推奨
 * bubble_cp <対象:character> ＠キャラ:穴から吹き出す泡
 * bubble_w <対象:weather> ＠天候:水中の泡
 * charm_bw <対象:weather> ＠天候:画面全体ハート
 * click <対象:click> ＠click:マウスクリック/タップ用1
 * click2 <対象:click> ＠click:マウスクリック/タップ用2
 * cloud_shadow_w <対象:screen> ＠天候:雲の影
 * cloud_w <対象:screen> ＠天候:雲
 * dark_hole_r <対象:region> ＠リージョン:穴からキラキラ吹き上げる光
 * dark_hole_r_2 <対象:region> ＠リージョン:穴から吹き上げる線形の光
 * dark_hole_r_3 <対象:region> ＠リージョン:穴の中のもやもや
 * darkness_s <対象:screen> ＠スクリーン:暗闇の視界制限
 * diamonddust_w <対象:weather> ＠天候:キラキラ漂うダイヤモンドダスト
 * diamonddust_w2 <対象:weather> ＠天候:キラキラ漂うダイヤモンドダスト2
 * drag <対象:character> ＠drag:マウスドラッグ用
 * dust_walk <対象:walk> ＠歩行:土煙
 * explode_cp_1 <対象:character> ＠キャラ:爆発前のサークル収束
 * explode_cp_2 <対象:character> ＠キャラ:爆発の炎
 * explode_cp_3 <対象:character> ＠キャラ:爆発時のサークル発散
 * explode_cp_4 <対象:character> ＠キャラ:爆発後のチカチカする円
 * fire_c <対象:character> ＠キャラ:大きな炎
 * fire_pillar_c <対象:character> ＠キャラ:行き止まり用の炎の柱
 * fireworks_c <対象:character> ＠キャラ:打ち上げ花火
 * fireworks_dragon_c <対象:character> ＠キャラ:噴出タイプの花火
 * fish_w <対象:weather> ＠天候:水中の影
 * flare_s <対象:screen> ＠スクリーン:太陽光のフレア
 * flash_s <対象:screen> ＠スクリーン:太陽光のフラッシュ
 * flower_walk <対象:walk> ＠歩行:歩いた跡に花(タイル使用)
 * fog_shadow_w <対象:screen> ＠天候:モヤの影
 * fog_w <対象:weather> ＠天候:薄いフォグ
 * fog_w2 <対象:screen> ＠天候:濃いめのモヤ
 * fuss_c <対象:character> ＠キャラ:乱闘中っぽいアニメ調の煙
 * fuss_startdash <対象:startdash> ＠スタートダッシュ:アニメ調の煙
 * fuss_walk <対象:walk> ＠歩行:アニメ調の煙
 * grass_walk <対象:walk> ＠歩行:飛び散る草
 * illumination_w <対象:weather> ＠天候:カラフルなイルミネーション
 * kira_blue_c <対象:character> ＠キャラ:青いキラキラエフェクト
 * light_float_cp <対象:character> ＠キャラ:光柱が頭上に向かって消える
 * light_floor_r <対象:region> ＠リージョン:キラキラ点滅する小さな光粒
 * light_leak_s <対象:screen> ＠スクリーン:淡いライトリーク
 * light_leak_s2 <対象:screen> ＠スクリーン:青&緑のライトリーク
 * light_pillar_r <対象:region> ＠リージョン:空エリアの光の柱
 * light_pillar_w <対象:weather> ＠天候:上部からの光柱。横スク用マップ用
 * light_r <対象:region> ＠region:テスト用1
 * magic_circle_c <対象:character> ＠キャラ:魔法陣の幾何学エフェクト
 * magma_r <対象:region> ＠リージョン:マグマの床
 * mahoujin_c <対象:character> ＠キャラ:魔法陣上のキラキラ光粒
 * mahoujin_c2 <対象:character> ＠キャラ:魔法陣上の光線演出
 * monster_c <対象:character> ＠キャラ:中央から光球が発生して上に
 * monster_cp <対象:character> ＠キャラ:パーティクルが収束
 * monster_cp2 <対象:character> ＠キャラ:集中線が発散。
 * orb_c <対象:character> ＠キャラ:オーブの波動
 * orb_cp <対象:character> ＠キャラ:青白いキラキラ光粒が発散
 * particle <対象:character> ＠テスト用
 * particle_w <対象:weather> ＠天候:ゆらゆら上昇する光粒
 * petal_w <対象:weather> ＠天候:桜の花びら
 * poison_r <対象:region> ＠リージョン:毒の沼
 * rain_fog_w <対象:weather> ＠天候:雨天時のモヤ
 * rain_w <対象:weather> ＠天候:しとしと雨
 * rain_w2 <対象:weather> ＠天候:強めの雨
 * rain_w3 <対象:weather> ＠天候:本降りの雨
 * ripple_r <対象:region> ＠リージョン:水たまりの波紋
 * ripple_walk <対象:walk> ＠歩行:水の波紋
 * smoke_c <対象:character> ＠キャラ:焚き火の煙
 * smoke_c2 <対象:character> ＠キャラ:fire用の大きな煙
 * snow_w <対象:weather> ＠天候:うっすらと降る雪
 * snow_w2 <対象:weather> ＠天候:雪の結晶
 * sparks_c <対象:character> ＠キャラ:焚き火の火の粉
 * sparks_w <対象:weather> ＠天候:薄っすらと舞い上がる火の粉
 * splash_walk <対象:walk> ＠歩行:水しぶき
 * statue_orb_c <対象:character> ＠キャラ:石像のオーブから出る光粒
 * thunder_w <対象:weather> ＠天候:ピカッと一瞬光る稲妻
 * thunder_w2 <対象:weather> ＠天候:黄色の稲妻
 * warp_red_c <対象:character> ＠キャラ:赤魔法陣ワープの集中線
 * warp_red_cp <対象:character> ＠キャラ:ワープ直後の幾何学エフェクト
 *
 *
 * 【パーティクルグループ】
 * commet <対象:weather> ＠星空と彗星
 * firefly <対象:region> ＠蛍
 * fireworks <対象:character> ＠打ち上げ花火
 *
 * @command set_character
 * @text set/表示 > キャラ対象(23)
 * @desc パーティクル表示
 *
 * @arg id
 * @text 管理ID
 * @desc 他と被らない管理ID。「def」で設定名,「-EID」で設定名-EID
 * @default def
 *
 * @arg target
 * @text ターゲット
 * @desc thisでこのイベント。「event:イベントID」「player」「weather」など
 * @default this
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 * @option aura_static_b <対象:character> ＠キャラ:もやもやのオーラ
 * @value aura_static_b
 * @option bubble_c <対象:character> ＠キャラ:キャラを包む泡。attach推奨
 * @value bubble_c
 * @option dust_walk <対象:walk> ＠歩行:土煙
 * @value dust_walk
 * @option fire_c <対象:character> ＠キャラ:大きな炎
 * @value fire_c
 * @option fire_pillar_c <対象:character> ＠キャラ:行き止まり用の炎の柱
 * @value fire_pillar_c
 * @option fireworks_dragon_c <対象:character> ＠キャラ:噴出タイプの花火
 * @value fireworks_dragon_c
 * @option flower_walk <対象:walk> ＠歩行:歩いた跡に花(タイル使用)
 * @value flower_walk
 * @option fuss_walk <対象:walk> ＠歩行:アニメ調の煙
 * @value fuss_walk
 * @option grass_walk <対象:walk> ＠歩行:飛び散る草
 * @value grass_walk
 * @option kira_blue_c <対象:character> ＠キャラ:青いキラキラエフェクト
 * @value kira_blue_c
 * @option magic_circle_c <対象:character> ＠キャラ:魔法陣の幾何学エフェクト
 * @value magic_circle_c
 * @option mahoujin_c <対象:character> ＠キャラ:魔法陣上のキラキラ光粒
 * @value mahoujin_c
 * @option mahoujin_c2 <対象:character> ＠キャラ:魔法陣上の光線演出
 * @value mahoujin_c2
 * @option monster_c <対象:character> ＠キャラ:中央から光球が発生して上に
 * @value monster_c
 * @option orb_c <対象:character> ＠キャラ:オーブの波動
 * @value orb_c
 * @option particle <対象:character> ＠テスト用
 * @value particle
 * @option ripple_walk <対象:walk> ＠歩行:水の波紋
 * @value ripple_walk
 * @option smoke_c <対象:character> ＠キャラ:焚き火の煙
 * @value smoke_c
 * @option smoke_c2 <対象:character> ＠キャラ:fire用の大きな煙
 * @value smoke_c2
 * @option sparks_c <対象:character> ＠キャラ:焚き火の火の粉
 * @value sparks_c
 * @option splash_walk <対象:walk> ＠歩行:水しぶき
 * @value splash_walk
 * @option statue_orb_c <対象:character> ＠キャラ:石像のオーブから出る光粒
 * @value statue_orb_c
 * @option warp_red_c <対象:character> ＠キャラ:赤魔法陣ワープの集中線
 * @value warp_red_c
 *
 * @arg z
 * @text Z値
 * @desc 重なり順。above:上、below:後ろ、screen、spritesetなど。数値指定も可
 * @default def
 *
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名
 *
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @command set_screen
 * @text set/表示 > スクリーン/天候/リージョン(39)
 * @desc パーティクル表示
 *
 * @arg id
 * @text 管理ID
 * @desc 他と被らない管理ID。「def」で設定名,「-EID」で設定名-EID
 * @default def
 *
 * @arg target
 * @text ターゲット
 * @desc thisでこのイベント。「event:イベントID」「player」「weather」など
 * @default weather
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 * @option black_particle_w <対象:weather> ＠天候:黒いパーティクル
 * @value black_particle_w
 * @option blizard_w <対象:weather> ＠天候:吹雪
 * @value blizard_w
 * @option bubble_w <対象:weather> ＠天候:水中の泡
 * @value bubble_w
 * @option charm_bw <対象:weather> ＠天候:画面全体ハート
 * @value charm_bw
 * @option cloud_shadow_w <対象:screen> ＠天候:雲の影
 * @value cloud_shadow_w
 * @option cloud_w <対象:screen> ＠天候:雲
 * @value cloud_w
 * @option dark_hole_r <対象:region> ＠リージョン:穴からキラキラ吹き上げる光
 * @value dark_hole_r
 * @option dark_hole_r_2 <対象:region> ＠リージョン:穴から吹き上げる線形の光
 * @value dark_hole_r_2
 * @option dark_hole_r_3 <対象:region> ＠リージョン:穴の中のもやもや
 * @value dark_hole_r_3
 * @option darkness_s <対象:screen> ＠スクリーン:暗闇の視界制限
 * @value darkness_s
 * @option diamonddust_w <対象:weather> ＠天候:キラキラ漂うダイヤモンドダスト
 * @value diamonddust_w
 * @option diamonddust_w2 <対象:weather> ＠天候:キラキラ漂うダイヤモンドダスト2
 * @value diamonddust_w2
 * @option fish_w <対象:weather> ＠天候:水中の影
 * @value fish_w
 * @option flare_s <対象:screen> ＠スクリーン:太陽光のフレア
 * @value flare_s
 * @option flash_s <対象:screen> ＠スクリーン:太陽光のフラッシュ
 * @value flash_s
 * @option fog_shadow_w <対象:screen> ＠天候:モヤの影
 * @value fog_shadow_w
 * @option fog_w <対象:weather> ＠天候:薄いフォグ
 * @value fog_w
 * @option fog_w2 <対象:screen> ＠天候:濃いめのモヤ
 * @value fog_w2
 * @option illumination_w <対象:weather> ＠天候:カラフルなイルミネーション
 * @value illumination_w
 * @option light_floor_r <対象:region> ＠リージョン:キラキラ点滅する小さな光粒
 * @value light_floor_r
 * @option light_leak_s <対象:screen> ＠スクリーン:淡いライトリーク
 * @value light_leak_s
 * @option light_leak_s2 <対象:screen> ＠スクリーン:青&緑のライトリーク
 * @value light_leak_s2
 * @option light_pillar_r <対象:region> ＠リージョン:空エリアの光の柱
 * @value light_pillar_r
 * @option light_pillar_w <対象:weather> ＠天候:上部からの光柱。横スク用マップ用
 * @value light_pillar_w
 * @option light_r <対象:region> ＠region:テスト用1
 * @value light_r
 * @option magma_r <対象:region> ＠リージョン:マグマの床
 * @value magma_r
 * @option particle_w <対象:weather> ＠天候:ゆらゆら上昇する光粒
 * @value particle_w
 * @option petal_w <対象:weather> ＠天候:桜の花びら
 * @value petal_w
 * @option poison_r <対象:region> ＠リージョン:毒の沼
 * @value poison_r
 * @option rain_fog_w <対象:weather> ＠天候:雨天時のモヤ
 * @value rain_fog_w
 * @option rain_w <対象:weather> ＠天候:しとしと雨
 * @value rain_w
 * @option rain_w2 <対象:weather> ＠天候:強めの雨
 * @value rain_w2
 * @option rain_w3 <対象:weather> ＠天候:本降りの雨
 * @value rain_w3
 * @option ripple_r <対象:region> ＠リージョン:水たまりの波紋
 * @value ripple_r
 * @option snow_w <対象:weather> ＠天候:うっすらと降る雪
 * @value snow_w
 * @option snow_w2 <対象:weather> ＠天候:雪の結晶
 * @value snow_w2
 * @option sparks_w <対象:weather> ＠天候:薄っすらと舞い上がる火の粉
 * @value sparks_w
 * @option thunder_w <対象:weather> ＠天候:ピカッと一瞬光る稲妻
 * @value thunder_w
 * @option thunder_w2 <対象:weather> ＠天候:黄色の稲妻
 * @value thunder_w2
 *
 * @arg z
 * @text Z値
 * @desc 重なり順。above:上、below:後ろ、screen、spritesetなど。数値指定も可
 * @default def
 *
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名
 *
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @command set_hidden
 * @text set/表示 > 非表示(/h)(7)
 * @desc パーティクル表示
 *
 * @arg id
 * @text 管理ID
 * @desc 他と被らない管理ID。「def」で設定名,「-EID」で設定名-EID
 * @default def
 *
 * @arg target
 * @text ターゲット
 * @desc thisでこのイベント。「event:イベントID」「player」「weather」など
 * @default this
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 *
 * @arg z
 * @text Z値
 * @desc 重なり順。above:上、below:後ろ、screen、spritesetなど。数値指定も可
 * @default def
 *
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名
 *
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @command play_character
 * @text play/１回再生 > キャラ対象(16)
 * @desc パーティクルを１回だけ再生
 *
 * @arg id
 * @text 管理ID
 * @desc 他と被らない管理ID。「def」で設定名,「-EID」で設定名-EID
 * @default def
 *
 * @arg target
 * @text ターゲット
 * @desc thisでこのイベント。「event:イベントID」「player」「weather」など
 * @default this
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 * @option aura_bp <対象:character> ＠キャラ:青白い粒子と集中線拡散
 * @value aura_bp
 * @option aura_bp2 <対象:character> ＠キャラ:青白いサークル拡大
 * @value aura_bp2
 * @option bubble_cp <対象:character> ＠キャラ:穴から吹き出す泡
 * @value bubble_cp
 * @option drag <対象:character> ＠drag:マウスドラッグ用
 * @value drag
 * @option explode_cp_1 <対象:character> ＠キャラ:爆発前のサークル収束
 * @value explode_cp_1
 * @option explode_cp_2 <対象:character> ＠キャラ:爆発の炎
 * @value explode_cp_2
 * @option explode_cp_3 <対象:character> ＠キャラ:爆発時のサークル発散
 * @value explode_cp_3
 * @option explode_cp_4 <対象:character> ＠キャラ:爆発後のチカチカする円
 * @value explode_cp_4
 * @option fireworks_c <対象:character> ＠キャラ:打ち上げ花火
 * @value fireworks_c
 * @option fuss_c <対象:character> ＠キャラ:乱闘中っぽいアニメ調の煙
 * @value fuss_c
 * @option fuss_startdash <対象:startdash> ＠スタートダッシュ:アニメ調の煙
 * @value fuss_startdash
 * @option light_float_cp <対象:character> ＠キャラ:光柱が頭上に向かって消える
 * @value light_float_cp
 * @option monster_cp <対象:character> ＠キャラ:パーティクルが収束
 * @value monster_cp
 * @option monster_cp2 <対象:character> ＠キャラ:集中線が発散。
 * @value monster_cp2
 * @option orb_cp <対象:character> ＠キャラ:青白いキラキラ光粒が発散
 * @value orb_cp
 * @option warp_red_cp <対象:character> ＠キャラ:ワープ直後の幾何学エフェクト
 * @value warp_red_cp
 *
 * @arg z
 * @text Z値
 * @desc 重なり順。above:上、below:後ろ、screen、spritesetなど。数値指定も可
 * @default def
 *
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名
 *
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @command play_system
 * @text play/１回再生 > マウス/タップ(2)
 * @desc パーティクルを１回だけ再生
 *
 * @arg id
 * @text 管理ID
 * @desc 他と被らない管理ID。「def」で設定名,「-EID」で設定名-EID
 * @default def
 *
 * @arg target
 * @text ターゲット
 * @desc thisでこのイベント。「event:イベントID」「player」「weather」など
 * @default this
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 * @option click <対象:click> ＠click:マウスクリック/タップ用1
 * @value click
 * @option click2 <対象:click> ＠click:マウスクリック/タップ用2
 * @value click2
 *
 * @arg z
 * @text Z値
 * @desc 重なり順。above:上、below:後ろ、screen、spritesetなど。数値指定も可
 * @default def
 *
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名
 *
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @command play_hidden
 * @text play/１回再生 > 非表示(/h)(2)
 * @desc パーティクルを１回だけ再生
 *
 * @arg id
 * @text 管理ID
 * @desc 他と被らない管理ID。「def」で設定名,「-EID」で設定名-EID
 * @default def
 *
 * @arg target
 * @text ターゲット
 * @desc thisでこのイベント。「event:イベントID」「player」「weather」など
 * @default this
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 *
 * @arg z
 * @text Z値
 * @desc 重なり順。above:上、below:後ろ、screen、spritesetなど。数値指定も可
 * @default def
 *
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名
 *
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 *
 *
 * @command group_character
 * @text group/グループ > キャラ対象(1)
 * @desc グループ呼び出し
 * @arg id
 * @text グループ管理ID
 * @desc 他と被らないグループ用管理ID。「def」でIDは設定名、「-EID」で設定名-EID。
 * @default def
 * @arg target
 * @text 対象
 * @desc 対象。this,player,weatherなど。対象をtargetとしたコマンドで有効
 * @default this
 * @arg name
 * @text 《グループ設定名》
 * @desc 呼び出すグループの設定名
 * @type select
 * @default 《呼び出す設定を選択》
 * @option fireworks <対象:character> ＠打ち上げ花火
 * @value fireworks
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名。省略で「group:グループID」
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 * @command group_screen
 * @text group/グループ > スクリーン/天候/リージョン(2)
 * @desc グループ呼び出し
 * @arg id
 * @text グループ管理ID
 * @desc 他と被らないグループ用管理ID。「def」でIDは設定名、「-EID」で設定名-EID。
 * @default def
 * @arg target
 * @text 対象
 * @desc 対象。this,player,weatherなど。対象をtargetとしたコマンドで有効
 * @default this
 * @arg name
 * @text 《グループ設定名》
 * @desc 呼び出すグループの設定名
 * @type select
 * @default 《呼び出す設定を選択》
 * @option commet <対象:weather> ＠星空と彗星
 * @value commet
 * @option firefly <対象:region> ＠蛍
 * @value firefly
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名。省略で「group:グループID」
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @requiredAssets img/particles/particle9
 * @requiredAssets img/particles/line_ray2
 * @requiredAssets img/particles/particle7
 * @requiredAssets img/particles/flare
 * @requiredAssets img/particles/line_oval3
 * @requiredAssets img/particles/snow_particle2g
 * @requiredAssets img/particles/circle3g
 * @requiredAssets img/particles/cloud3
 * @requiredAssets img/particles/particle8
 * @requiredAssets img/particles/particle5
 * @requiredAssets img/particles/snow_particle2
 * @requiredAssets img/particles/snow_particle1
 * @requiredAssets img/particles/bubble1
 * @requiredAssets img/particles/heart4g
 * @requiredAssets img/particles/particle1
 * @requiredAssets img/particles/circle
 * @requiredAssets img/particles/cloud2
 * @requiredAssets img/particles/cloud1
 * @requiredAssets img/particles/shine2
 * @requiredAssets img/particles/smoke2
 * @requiredAssets img/particles/cloud2s
 * @requiredAssets img/particles/shine_thin3
 * @requiredAssets img/particles/particle2
 * @requiredAssets img/particles/smog1
 * @requiredAssets img/particles/circle2
 * @requiredAssets img/particles/smog2
 * @requiredAssets img/particles/smoke1
 * @requiredAssets img/particles/flame1g
 * @requiredAssets img/particles/fish1
 * @requiredAssets img/particles/flare2
 * @requiredAssets img/particles/cartoon_fuss2
 * @requiredAssets img/particles/cartoon_fuss1
 * @requiredAssets img/particles/flame1
 * @requiredAssets img/particles/particle4
 * @requiredAssets img/particles/shine3
 * @requiredAssets img/particles/line_oval1
 * @requiredAssets img/particles/hexagon_line3
 * @requiredAssets img/particles/hexagon1
 * @requiredAssets img/particles/line2
 * @requiredAssets img/particles/line_oval2
 * @requiredAssets img/particles/ripple1g
 * @requiredAssets img/particles/petal1
 * @requiredAssets img/particles/line_rain2
 * @requiredAssets img/particles/line_rain1
 * @requiredAssets img/particles/ripple2
 * @requiredAssets img/particles/snow2
 * @requiredAssets img/particles/snow5g
 * @requiredAssets img/particles/thunder1
 * @requiredAssets img/particles/thunder2
 * @requiredAssets img/particles/square_line1
 */

var $dataTrpParticlePreset,$dataTrpParticleGroupsPreset;


var TRP_Localize = TRP_Localize || function(){};
if(!TRP_Localize.localize){
	TRP_Localize.localize = function(symbol,original,id){
		if($gameSystem && $gameSystem.isJapanese())return original;
		return this.DATA[symbol][id]||this.DATA.duplication[original]||original;
	};
	TRP_Localize.noLocalize = function(original,id,translated){
		if($gameSystem && $gameSystem.isJapanese())return original;
		return translated||original;
	};
	TRP_Localize.DATA = {"duplication":{},"parPr":{},"parMa":{},"parEd":{},"parGr":{},"parGe":{},"parSe":{},"preWa":{}};
}

(()=>{
'use strict';

var LC = TRP_Localize.localize.bind(TRP_Localize,'parPr');
var NLC = TRP_Localize.noLocalize;
$dataTrpParticlePreset = {
	//システム用
	click:[[[0,1,0.85,0.5,1,0],0,0],[[0,1.5,0.5,1,1,0],0.5,0,0],[[0,200,1,200],0.5,0,0],[[0,"#0031ff",0.25,"#eaff00",0.5,"#00ff04",0.75,"#7b00ff",1,"#ff0000"],0,0],1,[0,300],0,[0,360],[0,0],0,0,[0.4,0.6],1,0.001,1,1,0.01,1000,[0,0],0,[0,0],null,null,0,0,"particle1",12,
		LC("click:マウスクリック/タップ用1",0)],
    click2:[[[0,0.2,1,0],0,0],[[0,0,0.25,0.75,1,1.5],1,0,0],[[0,0,1,0],1,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[0,360],[0,0],0,0,[0.35,0.35],null,0.001,1,1,0.0011,10000,[0,0],0,[0,0],null,null,0,0,"circle",12,
    	LC("click:マウスクリック/タップ用2",1)],
    drag:[[[0,1,1,1],0,0],[[0,1,0.85,0.5,1,0],0.999,0,0],[[0,0,1,0],1,0,0],[[0,"#96abff",1,"#172eff"],0,0],0,[0,0],0,[0,360],[0,0],0,0,[0.3,0.3],1,0.0005,1,0,0.0011,10000,[0,0],0,[0,0],null,null,0,0,"particle2",13,
    	LC("drag:マウスドラッグ用",2)],

	//水中マップ
	bubble_w:[[[0,0,0.2,0.6,0.95,0.6,1,0],0,0],[[0,0,0.2,0.3,0.95,0.7,1,0.8],0.4,0,0],[[0,1,0.2,50,1,50],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[1,3],null,0.2,1,0,-1,10000,[0,0],1,[0,0],[-408,-312,816,624],null,0,0,"bubble1",6,
		LC("天候:水中の泡",3)],
	bubble_cp:[[[0,0,0.2,0.6,0.9,0.6,1,0],0,0],[[0,0,0.2,0.2,0.9,0.2,1,0.3],0.1,0,0],[[0,1,0.2,100,1,100],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[1,3],null,0.05,1,0,1,10000,[0,0],1,[0,0],[-24,0,48,0],null,0,0,"bubble1",0,
		LC("キャラ:穴から吹き出す泡",4)],
	bubble_c:[[[0,0,0.5,0.7,1,0],0,0],[[0,1,1,1.3],1,0,0],[[0,1,1,1],1,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[1,1],null,0.5,1,0,-1,10000,[0,0],2,[0,0],null,[0,-26,3,0],0,0,"bubble1",3,
		LC("キャラ:キャラを包む泡。attach推奨",5)],
	light_pillar_w:[[[0,0.5,1,0.51],0,0],[[0,4,1,4.01],2,0,0],[[0,1,1,1],1,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[90,90],[0,0],0,0,[99999,99999],1,0.001,1,1,-1,12,[0,0],1,[0,0],[-616,-500,1232,300],null,0,0,"line_oval1",6,
		LC("天候:上部からの光柱。横スク用マップ用",6)],
	fog_w:[[[0,0,0.05,0.05,0.9,0.05,1,0],0,0],[[0,4,0.5,4,1,4],0.3,0,0],[[0,70,1,70],0.3,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],1,[0,0],0,[0,0],[0,0],0,0,[30,30],1,0.3,1,0,-1,10000,[0,0],1,[0,0],[-508,-312,0,624],null,0,0,"cloud3,cloud2,cloud1",6,
		LC("天候:薄いフォグ",7)],
	fish_w:[[[0,0,0.1,0.4,0.9,0.4,1,0],0,0],[[0,1.01,1,1],0.3,0,0],[[0,130,0.2,180,0.4,60,0.6,120,0.8,180,1,60],0.5,0,0],[[0,"#000000",1,"#000000"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[10,10],2,1,1,0,-1,10000,[1,0.01],1,[0,0],[-500,-312,50,624],null,0,0,"fish1",6,
		LC("天候:水中の影",8)],
	mahoujin_c:[[[0,0,0.1,1,0.2,0,0.3,1,0.4,0,0.5,1,0.6,0,0.7,0,0.8,1,0.9,0,1,0],0,0],[[0,0,0.2,0.2,0.5,0.2,1,0],0.5,0,0],[[0,1,1,1],1,0,0],[[0,"#56ff89",0.5,"#52fffc",1,"#b3ff25"],0,0],1,[0,-100],0,[0,0],[0,0],0,0,[1,1],1,0.03,1,0,-1,10000,[0,0],3,[0,0],null,[0,-18,40,0],0,0,"particle2",0,
		LC("キャラ:魔法陣上のキラキラ光粒",9)],
	mahoujin_c2:[[[0,0,0.5,1,1,0],0,0],[[0,0,0.2,1,0.5,1,1,0],0.8,0,0],[[0,1,1,1],1,0,0],[[0,"#ff3287",1,"#566dff"],0,0],0,[0,-150],0,[0,0],[0,0],0,0,[1,1],1,0.04,1,0,-1,10000,[0,0],3,[0,0],null,[0,-60,64,0],0,0,"line2,line_oval2",0,
		LC("キャラ:魔法陣上の光線演出",10)],

	//火山マップ
	magma_r:[[[0,1,1,0],0,0],[[0,0,0.2,1.5,0.8,1.5,1,0],0.5,0,0],[[0,0,1,0],1,0,0],[[0,"#ff3007",0.5,"#ff5959",1,"#ffffff"],0,0],0,[0,0],0,[0,360],[0,0],0,0,[1,1],1,0.1,1,0,-1,1000,[0,0],0,[0,0],null,null,0,0,"particle4",7,
		LC("リージョン:マグマの床",11)],
	sparks_w:[[[0,1,0.5,1,1,0],0,0],[[0,0,0.1,0.15,0.5,0.15,1,0],0.5,0,0],[[0,120,1,50],0.3,0,0],[[0,"#ff2c00",1,"#ffbfb1"],0,0],0,[0,0],0,[-90,-90],[0,0],0,2,[0.8,1.5],1,0.1,1,0,-1,10000,[3,0.1],1,[0,0],[-408,-224,816,524],null,0,0,"flame1",6,
		LC("天候:薄っすらと舞い上がる火の粉",12)],
	sparks_c:[[[0,1,0.5,1,1,0],0,0],[[0,0,0.5,0.3,1,0],0.5,0,0],[[0,1,1,1],0.5,0,0],[[0,"#ff5500",1,"#ff8d54"],0,0],0,[0,-100],0,[-90,-90],[0,0],0,2,[1,1],1,0.1,1,0,-1,10000,[0,0],1,[0,0],[-18,-36,36,24],null,0,0,"flame1",0,
		LC("キャラ:焚き火の火の粉",13)],
	smoke_c:[[[0,0,0.5,0.8,1,0],0,0],[[0,1,1,0.8],1,0,0],[[0,1,1,100],0.5,0,0],[[0,"#7b7b7b",0.5,"#525252",1,"#525252"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[1.5,2],0,0.3,1,0,-1,10000,[0,0],0,[0,-64],null,null,0,0,"smoke1,smoke2",0,
		LC("キャラ:焚き火の煙",14)],
	fire_c:[[[0,0,0.2,1,0.5,1,1,0],0,0],[[0,0,0.2,1,0.5,1,1,0],0,0,0],[[0,1,0.2,250,1,150],0.5,0,0],[[0,"#ff2e2e",1,"#ffb92e"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[1,1],1,0.005,0.5,1,-1,10000,[0,0],1,[0,0],[-48,12,96,0],null,0,0,"smog2,smoke2,smoke1",0,
		LC("キャラ:大きな炎",15)],
	smoke_c2:[[[0,0,0.5,0.5,1,0],0,0],[[0,0,0.5,3,1,1],0.5,0,0],[[0,1,0.2,250,1,150],0.5,0,0],[[0,"#ffffff",1,"#7b7b7b"],0,0],1,[0,0],0,[-90,-90],[0,0],0,0,[1,1],4,0.01,0.5,1,-1,10000,[0,0],2,[0,0],null,[0,-36,80,0],0,0,"smoke2,smoke1,smog1",0,
		LC("キャラ:fire用の大きな煙",16)],
	explode_cp_1:[[[0,0,0.2,0.5,1,0.5],0,0],[[0,5,0.4,1,1,0],1,0,0],[[0,1,0.3,1,1,1],1,0,0],[[0,"#ffffff",1,"#ff7749"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[0.24,0.24],null,0.01,1,1,0.011,1,[0,0],0,[0,-24],null,null,0,0,"circle2",0,
		LC("キャラ:爆発前のサークル収束",17)],
	explode_cp_2:[[[0,1,0.2,1,0.7,1,1,0],0,0],[[0,1,0.15,6,0.3,1,0.45,8,0.6,1,0.8,10,1,12],0.1,0,0],[[0,500,0.3,100,1,0],0.3,0,0],[[0,"#ff7f7f",1,"#ff7f30"],0,0],0,[0,0],0,[0,360],[0,0],0,0,[0.3,1],1,0.001,1,1,0.03,10000,[0,0],0,[0,-24],null,null,0,0,"smog1",0,
		LC("キャラ:爆発の炎",18)],

	explode_cp_3:[[[0,0.6,0.2,0.4,1,0],0,0],[[0,0,0.18,4,1,4.5],1,0,0],[[0,1,0.3,1,1,1],1,0,0],[[0,"#ffffff",1,"#ff7749"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[1,1],null,0.04,1,0.05,1,1,[0,0],0,[0,-24],null,null,0,0,"circle2",0,
		LC("キャラ:爆発時のサークル発散",19)],
	explode_cp_4:[[[0,0,0.1,0.8,0.3,0.8,0.4,0,0.5,0.8,0.7,0.8,0.8,0,0.9,0.8,1,0],0,0],[[0,0.6,1,0.3],0.3,0,0],[[0,1,1,1],1,0,0],[[0,"#ff7824",0.5,"#ffffff",1,"#ff1515"],0,0],1,[0,0],0,[0,360],[0,0],0,0,[0.3,0.7],1,0.005,0.8,1,0.25,100,[0,0],3,[0,0],null,[0,-24,130,0],0,0,"circle2",0,
		LC("キャラ:爆発後のチカチカする円",20)],

	//花火マップ
	fireworks_c:[[[0,0,0.11,1,0.5,1,1,0],0,0],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8,0,0],[[0,1200,0.1,200,0.2,50,1,1],0.1,0,0],[[0,"#ff8d8d",0.4,"#ffffff",1,"#ffa83e"],0,0],1,[0,0],0,[0,360],[50,-50],0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,0],null,null,0,0,"flare",0,
		LC("キャラ:打ち上げ花火",21)],
	fireworks_dragon_c:[[[0,1,0.8,1,1,0],0,0],[[0,0.2,1,0],0.8,0,0],[[0,800,0.3,200,1,0],0.5,0,0],[[0,"#ff8d8d",0.4,"#ffffff",1,"#ffa83e"],0,0],1,[0,100],0,[-75,-105],[50,-50],0,0,[0.7,1],1,0.01,1,1,-1,10000,[0,0],0,[0,0],null,null,0,0,"smog2",0,
		LC("キャラ:噴出タイプの花火",22)],
	// fireworks_niagala_c:[[[0,1,0.8,1,1,0],0,0],[[0,0.3,0.8,0.15,1,0],0.8,0,0],[[0,10,1,350],1,0,0],[[0,"#ff8d8d",0.4,"#ffffff",1,"#ffa83e"],0,0],1,[0,0],0,[90,90],[50,-50],0,0,[0.7,1],1,0.003,1,1,-1,10000,[0,0],1,[0,0],[-120,-45,230,0],null,0,0,"smog2",0,
	// 	LC("キャラ:滝タイプの花火",23)],
	light_leak_s:[[[0,0,0.5,0.1,1,0],0,0],[[0,20,1,20],0.2,0,0],[[0,15,1,14],0.5,0,0],[[0,"#00ff0c",0.5,"#fff500",1,"#ff5f5f"],0,0],1,[0,0],0,[0,0],[0,0],0,0,[3,5],1,0.15,0.5,0,-1,10000,[2,0.02],1,[0,0],[-408,-312,816,624],null,0,0,"particle4",5,
		LC("スクリーン:淡いライトリーク",24)],

	//雪マップ
	blizard_w:[[[0,1,0.8,1,1,0],0,0],[[0,0.41,1,0.4],0.3,0,0],[[0,2000,1,2000],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[15,30],[0,0],0,0,[0.13,0.13],1,0.001,1,5,-1,10000,[0,0],1,[0,0],[-408,-412,916,624],null,0,0,"snow_particle2,snow_particle1",6,
		LC("天候:吹雪",25)],
	snow_w:[[[0,0,0.2,1,1,0],0,0],[[0,0.2,1,0.2],0.5,0,0],[[0,100,1,100],1,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[90,90],[-100,100],0,0,[20,30],1,0.1,1,0,-1,10000,[1,0.01],1,[0,0],[-408,-440,916,40],null,0,0,"snow_particle1",6,
		LC("天候:うっすらと降る雪",26)],
	snow_w2:[[[0,0,0.3,0.6,1,0],0,0],[[0,0.31,1,0.3],0.1,0,0],[[0,50,1,50],0.75,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[90,90],[-50,50],0,0,[5,10],1,0.1,1,0,-1,10000,[2,0.01],1,[0,0],[-408,-412,916,624],null,0,0,"snow2,snow5g",6,
		LC("天候:雪の結晶",27)],
	diamonddust_w:[[[0,0,0.5,1,1,0],0,0],[[0,0.8,1,0.81],0.2,0,0],[[0,15,1,14],0.5,0,0],[[0,"#b2f7ff",1,"#d6ffe1"],0,0],1,[0,0],0,[0,360],[-120,120],0,0,[1.2,1.8],1,0.1,1,0,-1,10000,[2,0.02],1,[0,0],[-408,-312,816,624],null,0,0,"shine_thin3",6,
		LC("天候:キラキラ漂うダイヤモンドダスト",28)],
	diamonddust_w2:[[[0,0,0.5,1,1,0],0,0],[[0,0.6,1,0.61],0.3,0,0],[[0,15,1,14],0.5,0,0],[[0,"#92ff7b",1,"#89d7ff"],0,0],1,[0,0],0,[0,360],[-120,120],0,0,[1,1.5],1,0.03,1,0,-1,10000,[2,0.02],1,[0,0],[-408,-312,816,624],null,0,0,"shine_thin3",6,
		LC("天候:キラキラ漂うダイヤモンドダスト2",29)],
	illumination_w:[[[0,0,0.5,1,1,0],0,0],[[0,0.8,1,0.81],0.2,0,0],[[0,15,1,14],0.5,0,0],[[0,"#e0ff14",0.25,"#3c00ff",0.5,"#ff4d00",0.75,"#00bbff",1,"#00ff45"],0,0],1,[0,0],0,[0,360],[-120,120],0,0,[1.2,1.8],1,0.03,1,0,-1,10000,[2,0.02],1,[0,0],[-408,-312,816,624],null,0,0,"shine_thin3,particle4,flare2",6,
		LC("天候:カラフルなイルミネーション",30)],
	light_leak_s2:[[[0,0,0.5,0.3,1,0],0,0],[[0,1,1,1],0.3,0,0],[[0,15,1,14],0.5,0,0],[[0,"#92ff7b",1,"#89d7ff"],0,0],1,[0,0],0,[0,360],[-120,120],0,0,[2,4],1,0.4,1,0,-1,10000,[2,0.02],1,[0,0],[-408,-312,816,624],null,0,0,"flare",5,
		LC("スクリーン:青&緑のライトリーク",31)],
	kira_blue_c:[[[0,1,0.5,1,1,0],0,0],[[0,1,0.5,1,1,0],0.2,0,0],[[0,60,1,0],0.2,0,0],[[0,"#e0e6ff",1,"#a3ffc8"],0,0],0,[0,0],0,[-90,-90],[-90,90],0,0,[0.5,1],1,0.5,1,3,-1,10000,[0,0],1,[0,0],[-24,0,48,-48],null,0,0,"shine_thin3",0,
		LC("キャラ:青いキラキラエフェクト",32)],

	//闇マップ
	dark_hole_r:[[[0,1,0.1,1,0.15,0,0.2,1,0.4,1,0.45,0,0.5,1,0.8,1,0.84,0,0.88,1,0.92,0,0.96,1,1,0],0,0],[[0,0.35,0.5,0.25,1,0],0.2,0,0],[[0,200,1,100],0.3,0,0],[[0,"#1a6dad",1,"#a3ffc8"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[0.5,1.5],0,0.3,1,0,-1,10000,[3,0.01],0,[0,0],null,null,0,0,"shine2",7,
		LC("リージョン:穴からキラキラ吹き上げる光",33)],
	dark_hole_r_2:[[[0,1,0.5,1,1,0],0,0],[[0,1,0.5,1,1,0],0.3,0,0],[[0,200,1,100],1,0,0],[[0,"#073f74",1,"#78f4e1"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[0.8,0.8],1,0.1,1,0,-1,10000,[0,0],0,[0,0],null,null,0,0,"line_oval3",7,
		LC("リージョン:穴から吹き上げる線形の光",34)],
	dark_hole_r_3:[[[0,0,0.5,0.3,1,0],0,0],[[0,0,0.5,2,1,3],0.5,0,0],[[0,1,1,1],1,0,0],[[0,"#00acff",1,"#b70eff"],0,0],0,[0,0],0,[0,0],[0,0],0,2,[0.5,1.5],3,0.5,1,1,-1,10000,[0,0],0,[0,0],null,null,0,0,"smoke2",7,
		LC("リージョン:穴の中のもやもや",35)],
	poison_r:[3,[[0,0,0.5,0.5,1,0]],[[0,0,0.8,0.4,1,0.5],0.25],[[0,1,1,1],1],[[0,"#57005f",1,"#69005d"]],0,[0,0],null,[-90,-90],[0,0],0,0,[0.6,1.2],2,0.5,0.5,1,-1,10000,[0,0],0,[0,0],null,0,0,"circle2",7,
		LC("リージョン:毒の沼",36)],
	darkness_s:[3,[[0,0,0.5,0.8,1,0]],[[0,8,0.5,8,1,8],0.5],[[0,1,1,1],1],[[0,"#000000",1,"#000000"]],0,[0,0],null,[0,360],[0,0],0,0,[2,2],2,0.04,1,1,-1,10000,[0,0],3,[0,0],[0,0,450,400],0,0,"smoke2,cloud2s",5,
		LC("スクリーン:暗闇の視界制限",37)],
	monster_cp:[3,[[0,0,0.1,1,0.9,1,1,0]],[[0,5,1,0.3],0.3],[[0,-220,1,-220],1],[[0,"#3714ff",1,"#0022ff"]],0,[0,0],null,[0,0],[0,0],0,0,[0.3,0.8],1,0.01,1,2,0.4,10000,[0,0],3,[0,0],[0,-24,100,80],0,0,"particle4",0,
		LC("キャラ:パーティクルが収束",38)],
	monster_cp2:[3,[[0,0,0.3,1,1,0]],[[0,2.5,0.3,1,1,0.5],0.8],[[0,1200,0.2,200,1,0],0.8],[[0,"#7b00ff",1,"#c99bff"]],1,[0,0],null,[0,360],[0,0],0,0,[0.4,0.8],1,0.01,1,3,0.1,10000,[0,0],0,[0,-24],null,0,0,"line_oval2",0,
		LC("キャラ:集中線が発散。",39)],
	monster_c:[3,[[0,0,0.2,1,0.8,1,1,0]],[[0,0.75,1,0],0.5],[[0,120,1,121],0.5],[[0,"#da9fff",1,"#ec6dff"]],0,[0,-30],null,[30,-210],[0,0],0,0,[1,1.5],1,0.1,1,1,-1,10000,[0,0],0,[0,-12],null,0,0,"particle2",0,
		LC("キャラ:中央から光球が発生して上に",40)],
	aura_bp:[3,[[0,1,0.7,1,1,0]],[[0,2,0.15,0.8,0.7,0.8,1,0],0.5],[[0,1500,0.15,50,0.7,50,1,100],0.2],[[0,"#8dfffd",1,"#ffffff"]],0,[0,0],null,[0,360],[0,0],0,0,[1,1],1,0.0015,1,1,0.1,10000,[0,0],0,[0,0],null,0,0,"snow_particle2g,line_oval3",8,
		LC("戦闘キャラ:青白い光の粒＆集中線発散",41)],
	aura_bp2:[3,[[0,1,0.2,1,1,0]],[[0,0,0.18,4,1,4.5],1],[[0,1,0.3,1,1,1],1],[[0,"#ffffff",1,"#49d5ff"]],0,[0,0],null,[0,0],[0,0],0,0,[1,1],1,0.04,1,0.05,1,1,[0,0],0,[0,0],null,0,0,"circle3g",8,
		LC("戦闘キャラ:青白いサークル拡大",42)],

	//天界,
	light_pillar_r:[3,[[0,0,0.3,0.5,0.7,0.5,1,0]],[[0,3,1,3],0.4],[[0,1,1,0],1],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[90,90],[0,0],0,0,[5,5],1,1,0.02,1,-1,10000,[0,0],0,[0,0],null,0,0,"line_oval3",7,
		LC("リージョン:空エリアの光の柱",43)],
	light_floor_r:[3,[[0,0,0.5,1,0.55,0,0.6,1,0.65,0,0.7,1,0.75,0,0.8,1,0.85,0,0.9,1,0.95,0,1,0]],[[0,0,0.5,0.2,1,0],0.5],[[0,20,1,20],0.5],[[0,"#ffea00",1,"#ffea00"]],0,[0,-50],null,[-90,-90],[-120,120],0,0,[1,2],1,1,1,1,-1,10000,[0,0],2,[0,0],[0,-12,32,0],0,0,"shine3",7,
		LC("リージョン:キラキラ点滅する小さな光粒",44)],
	particle_w:[3,[[0,0,0.5,1,1,0]],[[0,0.6,1,0.6],0.2],[[0,40,1,40],0.2],[[0,"#ffc2c2",1,"#fffdb9"]],1,[0,-10],null,[-90,-90],[0,0],0,0,[1.5,4],1,0.1,1,1,-1,10000,[5,0.2],1,[0,0],[-408,-312,816,624],0,0,"particle8,particle5",6,
		LC("天候:ゆらゆら上昇する光粒",45)],
	orb_c:[3,[[0,0.5,1,0]],[[0,0,0.1,2,1,3.5],0.8],[[0,1,1,1],1],[[0,"#00d0ff",1,"#a6eeff"]],0,[0,0],null,[0,360],[0,0],0,0,[0.6,0.6],1,0.1,1,1,-1,10000,[0,0],0,[0,-24],null,0,0,"ripple1g",0,
		LC("キャラ:オーブの波動",46)],
	orb_cp:[3,[[0,1,1,0]],[[0,0,0.1,1,1,0],0.8],[[0,800,0.1,200,1,1],0.5],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[0,360],[0,0],0,0,[0.5,0.7],1,0.005,1,1,0.1,10000,[0,0],0,[0,-26],null,0,0,"shine3",0,
		LC("キャラ:青白いキラキラ光粒が発散",47)],
	light_float_cp:[3,[[0,1,1,0]],[[0,3,1,0],0.2],[[0,500,1,1],0.5],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[-90,-90],[0,0],0,0,[0.4,0.8],1,0.003,1,1,0.15,10000,[0,0],1,[0,0],[-18,-150,36,0],0,0,"line_oval3",0,
		LC("キャラ:光柱が頭上に向かって消える",48)],
	statue_orb_c:[3,[[0,0,0.5,1,1,0]],[[0,0.5,1,0],0.5],[[0,1,1,80],0.5],[[0,"#ffff00",1,"#460000"]],0,[0,0],null,[-180,0],[0,0],0,0,[1,1],1,0.1,1,1,-1,10000,[0,0],0,[0,-22],null,0,0,"cloud2",0,
		LC("キャラ:石像のオーブから出る光粒",49)],
	magic_circle_c:[3,[[0,0,0.5,1,1,0]],[[0,0.25,1,0],0.5],[[0,50,1,50],0.5],[[0,"#ff0707",1,"#ffcdcd"]],0,[0,-30],null,[-90,-90],[-120,120],0,0,[0.5,1.5],2,0.05,1,1,-1,10000,[0,0],2,[0,0],[0,-24,24,0],0,0,"hexagon_line3,hexagon1",0,
		LC("キャラ:魔法陣の幾何学エフェクト",50)],
	warp_red_c:[3,[[0,0,0.5,1,1,0]],[[0,0,0.5,1.5,1,0],0.5],[[0,10,1,150],1],[[0,"#ff3030",1,"#ff1d1d"]],0,[0,0],null,[0,360],[0,0],0,0,[0.5,1],2,0.03,1,1,-1,10000,[0,0],0,[0,-24],null,0,0,"line_oval3,line_oval2",0,
		LC("キャラ:赤魔法陣ワープの集中線",51)],
	warp_red_cp:[3,[[0,0,0.5,1,1,0]],[[0,0.5,0.5,0.2,1,0],0.5],[[0,1000,0.2,200,1,0],0.5],[[0,"#9100ff",1,"#ff0000"]],1,[0,0],null,[-90,-90],[-360,360],0,0,[0.5,1],2,0.01,1,1,0.3,10000,[0,0],2,[0,-24],[0,12,36,0],0,0,"square_line1",0,
		LC("キャラ:ワープ直後の幾何学エフェクト",52)],

	fire_pillar_c:[4,[[0,0,0.5,1,1,0]],[[0,0,0.2,0.6,1,0],0.7],[[0,150,1,50],1],[[0,"#ff824d",1,"#ff7d46"]],0,[0,0],null,[-90,-90],[0,0],0,2,0,[1,1.5],1,0.05,1,2,-1,10000,[0,0],4,[-12,18],[0,0,0,1,0,24,0],0,0,"flame1g",0,
		LC("キャラ:行き止まり用の炎の柱",53)],


	//歩行
	fuss_startdash:[[[0,0,0.1,0.8,0.5,0.5,1,0],0,0],[[0,0,0.2,0.5,0.9,0.5,1,0.12],0.5,0,0],[[0,500,0.2,50,1,0],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-60,-120],[-100,100],0,0,[0.6,1.2],4,0.01,1,3,0.05,60,[0,0],0,[0,0],null,null,0,0,"cartoon_fuss1",2,
		LC("スタートダッシュ:アニメ調の煙",54)],
	fuss_walk:[[[0,0,0.1,0.8,0.5,0.5,1,0],0,0],[[0,0,0.3,0.5,0.9,0.5,1,0.12],0.5,0,0],[[0,150,1,0],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-60,-120],[0,0],0,0,[0.5,1],4,0.1,1,3,-1,60,[0,0],0,[0,0],null,null,0,0,"cartoon_fuss2",1,
		LC("歩行:アニメ調の煙",55)],
	dust_walk:[[[0,0,0.1,0.3,1,0],0,0],[[0,0,0.05,1.5,1,2],0.5,0,0],[[0,100,1,0],0.5,0,0],[[0,"#a4724c",1,"#ffffff"],0,0],0,[0,0],0,[-150,-30],[0,0],0,0,[0.7,1.2],0,0.08,0.7,1,-1,60,[0,0],2,[0,0],null,[0,-6,12,0],0,0,"smog1",1,
		LC("歩行:土煙",56)],
	grass_walk:[[[0,0,0.1,0.8,0.5,0.5,1,0],0,0],[[0,0,0.3,0.2,0.9,0.2,1,0.12],0.5,0,0],[[0,200,1,200],0.8,0,0],[[0,"#005b11",1,"#005b11"],0,0],0,[0,300],0,[-30,-150],[-100,200],1,2,[0.4,0.6],0,0.25,1,4,-1,60,[0,0],0,[0,0],null,null,0,0,"flame1",1,
		LC("歩行:飛び散る草",57)],
	flower_walk:[[[0,0,0.005,1,0.5,1,1,0],0,0],[[0,0,0.005,1,0.5,1,1,1],0.5,0,0],[[0,0,1,0],0,0,0],[[0,"#ffffff",0.5,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[0.5,1.5],0,0.025,1,1,-1,1000,[0,0],2,[0,0],null,[0,0,24,0],0,0,"tile:Outside_B:73,tile:Outside_B:74,tile:Outside_B:75",1,
		LC("歩行:歩いた跡に花(タイル使用)",58)],
	splash_walk:[[[0,0,0.1,0.8,0.7,0.5,1,0],0,0],[[0,0,0.3,0.25,0.9,0.25,1,0],0.3,0,0],[[0,350,1,0],0.5,0,0],[[0,"#0047ff",1,"#ffffff"],0,0],0,[0,100],0,[-30,-150],[0,0],0,0,[0.4,0.5],1,0.25,1,4,-1,60,[0,0],0,[0,0],null,null,0,0,"snow_particle2",1,
		LC("歩行:水しぶき",59)],
	ripple_walk:[[[0,0,0.1,0.5,1,0],0,0],[[0,0,0.1,1,1,2],0.4,0,0],[[0,0,1,0],0.5,0,0],[[0,"#c2cdff",1,"#d4e6ff"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[0.5,1],1,0.08,0.7,1,-1,60,[0,0],2,[0,0],null,[0,-4,6,0],0,0,"ripple2",1,
		LC("歩行:水の波紋",60)],
	fuss_c:[[[0,0,0.1,0.8,0.5,0.5,1,0],0,0],[[0,0,0.3,1,1,2],0.1,0,0],[[0,150,1,0],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-60,-120],[0,0],0,0,[0.5,1],4,0.03,1,3,0.5,30,[0,0],1,[0,0],[-36,0,72,0],null,0,0,"cartoon_fuss2",0,
		LC("キャラ:乱闘中っぽいアニメ調の煙",61)],

	//天候
	flash_s:[[[0,0,0.2,0.25,1,0],0,0],[[0,6,1,6],0.9,0,0],[[0,1,1,1],1,0,0],[[0,"#ffe8ad",1,"#ffe8ad"],0,0],1,[0,0],0,[0,360],[0,0],0,0,[1,1],1,0.2,0.25,0,-1,10000,[0,0],0,[-500,-550],null,null,0,0,"flare",5,
		LC("スクリーン:太陽光のフラッシュ",62)],
	flare_s:[[[0,0,0.2,1,0.8,1,1,0],0,0],[[0,6,1,6],0.9,0,0],[[0,1,1,1],1,0,0],[[0,"#ffb050",1,"#ffffff"],0,0],1,[0,0],0,[0,360],[0,0],0,0,[1,1],1,0.2,1,0,-1,10000,[0,0],0,[-500,-550],null,null,0,0,"flare2",5,
		LC("スクリーン:太陽光のフレア",63)],
	fog_w2:[[[0,0,0.05,0.1,0.9,0.1,1,0],0,0],[[0,4,0.5,4,1,4],0.3,0,0],[[0,70,1,70],0.3,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],1,[0,0],0,[0,0],[0,0],0,0,[30,30],1,0.3,1,0,-1,10000,[0,0],1,[0,0],[-616,-312,0,624],null,0,0,"cloud3,cloud2,cloud1",5,
		LC("天候:濃いめのモヤ",64)],
	fog_shadow_w:[[[0,0,0.05,0.05,0.9,0.05,1,0],0,0],[[0,5,0.5,5,1,5],0.25,0,0],[[0,70,1,70],0.3,0,0],[[0,"#000000",1,"#000000"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[30,30],2,0.3,1,0,-1,10000,[0,0],1,[0,0],[-616,-312,0,624],null,0,0,"cloud3,cloud2,cloud1",5,
		LC("天候:モヤの影",65)],
	cloud_w:[[[0,0,0.05,0.75,0.9,0.75,1,0],0,0],[[0,10,0.5,10,1,10],0.3,0,0],[[0,70,1,70],0.3,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[60,60],0,3,0.5,0,-1,10000,[0,0],1,[0,0],[-616,-312,0,624],null,0,0,"cloud3,cloud2,cloud1",5,
		LC("天候:雲",66)],
	cloud_shadow_w:[[[0,0,0.05,0.2,0.9,0.2,1,0],0,0],[[0,7,0.5,7,1,7],0.3,0,0],[[0,25,1,25],0.3,0,0],[[0,"#000000",1,"#000000"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[70,70],0,3,0.5,0,-1,10000,[0,0],1,[0,0],[-616,-312,0,624],null,0,0,"cloud3,cloud2,cloud1",5,
		LC("天候:雲の影",67)],
	rain_w:[[[0,0,0.2,0.6,1,0],0,0],[[0,0.3,1,0.3],0.5,0,0],[[0,300,1,300],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[90,90],[0,0],0,0,[0.3,0.5],1,0.008,1,0,-1,10000,[0,0],1,[0,0],[-408,-412,916,624],null,0,0,"line_rain2",6,
		LC("天候:しとしと雨",68)],
	rain_w2:[[[0,0,0.2,0.8,0.8,0.5,1,0],0,0],[[0,0.84,1,0.85],0.5,0,0],[[0,800,1,800],0.75,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[112.5,112.5],[0,0],0,0,[0.3,0.4],0,0.008,1,0,-1,10000,[0,0],1,[0,0],[-408,-412,916,624],null,0,0,"line_rain1",6,
		LC("天候:強めの雨",69)],
	rain_w3:[[[0,0,0.2,0.8,0.8,0.5,1,0],0,0],[[0,1.1,1,1],2.5,0,0],[[0,1500,1,1500],0.75,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[112.5,112.5],[0,0],0,0,[0.15,0.25],1,0.003,1,0,-1,10000,[0,0],1,[0,0],[-408,-412,916,624],null,0,0,"line2",6,
		LC("天候:本降りの雨",70)],
	ripple_r:[[[0,0.5,0.5,0.5,1,0],0,0],[[0,0,0.5,0.6,1,1],0.5,0,0],[[0,0,1,0],1,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[0,0],[0,0],0,2,[0.6,1],1,1,0.5,0,-1,10000,[0,0],1,[0,0],[-408,-312,816,624],null,0,0,"ripple2",7,
		LC("リージョン:水たまりの波紋",71)],
	rain_fog_w:[[[0,0,0.5,0.2,1,0],0,0],[[0,0.5,1,1],1.5,0,0],[[0,50,0.2,20,1,15],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-90,-90],[0,0],0,2,[1,2],1,0.08,0.5,0,-1,10000,[0,0],1,[0,0],[-408,-312,816,624],null,0,0,"smoke2",6,
		LC("天候:雨天時のモヤ",72)],
	thunder_w:[[[0,1,0.2,1,1,0],0,0],[[0,11,0.2,11,1,11],0.2,0,0],[[0,1,1,1],0.5,0,0],[[0,"#ffff20",0.05,"#3300ff",1,"#c800ff"],0,0],0,[0,0],0,[85,95],[0,0],0,2,[0.5,1],1,0.06,0.2,0,-1,10000,[0,0.02],1,[0,0],[-408,-412,816,200],null,0,0,"thunder1,thunder2",6,
		LC("天候:ピカッと一瞬光る稲妻",73)],
	thunder_w2:[[[0,1,0.2,1,1,0],0,0],[[0,11,0.2,11,1,11],0.2,0,0],[[0,1,1,1],0.5,0,0],[[0,"#ffff20",1,"#ffff20"],0,0],0,[0,0],0,[85,95],[0,0],0,2,[0.5,1],1,0.06,0.2,0,-1,10000,[0,0.02],1,[0,0],[-408,-412,816,200],null,0,0,"thunder1,thunder2",6,
		LC("天候:黄色の稲妻",74)],
	petal_w:[3,[[0,0,0.2,0.8,0.8,0.8,1,0]],[[0,0.25,1,0.25],0.75],[[0,200,0.5,100,1,200],0.5],[[0,"#fabfff",1,"#fce1ff"]],1,[0,0],null,[0,0],[-180,180],-1,0,[2,4],4,0.05,1,1,-1,10000,[5,0.2],1,[0,0],[-408,-312,816,624],0,0,"petal1",6,
		LC("天候:桜の花びら",75)],

	//戦闘
	aura_bp:[3,[[0,1,0.7,1,1,0]],[[0,2,0.15,0.8,0.7,0.8,1,0],0.5],[[0,1500,0.15,50,0.7,50,1,100],0.2],[[0,"#8dfffd",1,"#ffffff"]],0,[0,0],null,[0,360],[0,0],0,0,[1,1],1,0.0015,1,1,0.1,10000,[0,0],0,[0,0],null,0,0,"snow_particle2g,line_oval3",0,
		LC("キャラ:青白い粒子と集中線拡散",76)],
	aura_bp2:[3,[[0,1,0.2,1,1,0]],[[0,0,0.18,4,1,4.5],1],[[0,1,0.3,1,1,1],1],[[0,"#ffffff",1,"#49d5ff"]],0,[0,0],null,[0,0],[0,0],0,0,[1,1],1,0.04,1,0.05,1,1,[0,0],0,[0,0],null,0,0,"circle3g",0,
		LC("キャラ:青白いサークル拡大",77)],
	aura_static_b:[3,[[0,0,0.5,1,1,0]],[[0,0,1,0.5],0.3],[[0,60,1,10],1],[[0,"#0592ff",1,"#0592ff"]],0,[0,-10],null,[0,360],[-90,90],-1,2,[1,1],1,0.01,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"cloud3",0,
		LC("キャラ:もやもやのオーラ",78)],
	charm_bw:[3,[[0,0,0.3,1,1,0]],[[0,0,0.3,0.4,1,0.6],0.5],[[0,100,1,1],0],[[0,"#dd00ff",1,"#ffffff"]],0,[0,0],null,[-120,-60],[-90,90],-1,0,[1.5,2.5],0,0.1,1,1,-1,1000,[0,0],1,[0,0],[-408,-312,816,624],0,0,"heart4g",6,
		LC("天候:画面全体ハート",79)],
	black_particle_w:[3,[[0,0,0.5,1,1,0]],[[0,0.6,1,0.6],0.2],[[0,40,1,40],0.2],[[0,"#670088",1,"#670088"]],1,[0,-10],null,[-90,-90],[0,0],0,0,[1.5,4],2,0.1,1,1,-1,10000,[5,0.2],1,[0,0],[-408,-312,816,624],0,0,"particle8,particle5",6,
		LC("天候:黒いパーティクル",80)],

	//テスト用
    particle:[[[0,0,0.5,1,1,0],0,0],[[0,0,0.5,1,1,0],0.5,0,0],[[0,300,1,100],1,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[0,360],[0,0],0,0,[1,1],1,0.01,1,1,-1,10000,[0,0],0,[0,0],null,null,0,0,"particle1",0,LC("テスト用",81)],
    light_r:[[[0,1,0.5,1,1,0],0,0],[[0,0,0.5,1,1,0],0.2,0,0],[[0,10,1,100],0.5,0,0],[[0,"#14ff1f",1,"#ffef9d"],0,0],1,[0,0],0,[-90,-90],[0,0],0,0,[1,2],0,0.2,1,1,-1,10000,[0,0],0,[0,0],null,null,0,0,"particle4",7,LC("リージョン:テスト用1",82)],

    //サブ用
    "commet/h":[4,[[0,0.8,1,0]],[[0,0.4,1,0.4],0.8],[[0,200,0.9,200,1,400],0.25],[[0,"#fffedf",1,"#feffef"]],0,[0,0],null,[140,140],[-300,0],0,0,0,[1.5,2],1,0.5,0.6,1,-1,10000,[0,0],1,[0,0],[-404,-308,808,200],0,0,"shine2",0,""],
    "_sub:0:commet/h":[4,[[0,1,1,0]],[[0,0.2,1,0.2],0.5],[[0,0,1,0],0.5],[[0,"#ffe2c4",1,"#ffffff"]],0,[0,0],null,[170,190],[150,150],0,0,0,[0.5,0.8],1,0.03,0.2,5,-1,10000,[0,0],2,[0,0],[0,0,10,0],0,0,"particle9",0,""],
    "_sub:1:commet/h":[4,[[0,0,0.5,1,1,0]],[[0,1.2,1,0],0.5],[[0,100,1,1],1],[[0,"#f8aaaa",1,"#ffffff"]],0,[0,0],null,[180,180],[0,0],0,0,0,[1,1],1,0.1,1,1,-1,10000,[0,0],2,[0,0],[0,0,7,0],0,0,"line_oval3",0,""],
    "starry_sky/h":[4,[[0,0,0.2,1,0.25,0.7,0.3,1,0.35,0.7,0.4,1,0.45,0.7,0.5,1,0.55,0.7,0.6,1,0.65,0.7,0.7,1,0.75,0.7,0.8,1,0.85,0.5,0.9,0.65,1,0]],[[0,0.2,1,0.2],0.3],[[0,0,1,0],1],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[4,6],1,0.05,1,1,-1,10000,[0,0],1,[0,0],[-404,-308,808,500],0,0,"particle9,particle8,particle7",0,""],
    "firefly/h":[4,[[0,0,0.2,1,0.4,0.5,0.5,1,0.6,0.5,0.8,1,1,0]],[[0,0.3,1,0.3],0.35],[[0,50,1,50],0.3],[[0,"#a4fb7b",1,"#a4fb7b"]],0,[0,0],null,[0,360],[0,0],0,0,0,[3,6],1,30,0.5,1,-1,10000,[5,0.3],1,[0,0],[0,0,0,0],0,0,"particle8",0,""],
    "_sub:0:firefly/h":[4,[[0,1,1,0]],[[0,0.05,1,0.05],0.5],[[0,10,1,0],1],[[0,"#b3ff86",1,"#ffffff"]],0,[0,0],null,[180,180],[0,0],0,0,0,[1.5,2],1,0.15,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"line_ray2,particle7",0,""],
    "fireworks_shot/h":[4,[[0,1,0.8,1,1,0]],[[0,0.15,1,0.15],0.5],[[0,800,0.5,300,0.8,100,1,0],0.7],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1,1],1,0.5,0.5,1,-1,10000,[0,0],1,[0,0],[-312,0,624,0],0,0,"particle9",0,""],
    "_sub:0:fireworks/h":[4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#ff8d8d",0.4,"#ffffff",1,"#ffa83e"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],1,[0,0],[0,0,0,0],0,0,"flare",0,""],
    "_sub:1:fireworks/h":[4,[[0,0.2,1,0]],[[0,0.5,1,0],0.5],[[0,0,1,0],1],[[0,"#ffd6c1",1,"#ffffff"]],0,[0,0],null,[175,185],[0,0],0,0,0,[0.4,0.6],1,0.01,1,1,0.9,10000,[1,0.01],0,[0,0],null,0,0,"particle9",0,""]

};


$dataTrpParticleGroupsPreset = {
	"commet":{"repeat":-1,"list":["set starry_sky/h screen def back","exceed starry_sky/h 1","set commet/h weather def back","sub set commet/h _sub:0 0 -1 0.1 1","sub set commet/h _sub:1 0 -1 0.2 1"],"targetType":6,"comment":LC("星空と彗星",83)},
	"firefly":{"repeat":-1,"list":["set firefly/h target","sub set firefly/h _sub:0 0 -1 0.3 1"],"targetType":7,"comment":LC("蛍",84)},
	"fireworks":{"repeat":-1,"list":["set fireworks_shot/h this def back","sub set fireworks_shot/h _sub:0 1 -1 0 0","sub set fireworks_shot/h _sub:1 0 0.75 0.5 1"],"targetType":0,"comment":LC("打ち上げ花火",85)}
};


})();
