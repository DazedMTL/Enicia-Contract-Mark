//=============================================================================
// TRP_ParticleMZ_ExPreset.js
//=============================================================================
/*:
 * @target MZ
 * @base TRP_ParticleMZ
 * @plugindesc パーティクルプリセットデータ
 * @help
 * 追加プリセットを含むプリセットデータ集プラグインです。
 * TRP_ParticleMZ_Preset、他追加プリセット(TRP_ParticleMZ_ExPreset1など)
 * をOFFとして変わりにこのプラグインをTRP_ParticleMZより手前に配置
 * してください。
 * 
 *
 * 【更新履歴】
 * 1.03 2021/11/8  スキル使用者エフェクト10種追加
 * 1.02 2021/10/15 不具合修正(magic_circle_2 -> magic_circle_c)
 * 1.01 2021/9/23  データ10種追加~サンプルマップ「屋内サンプル」
 * 1.00 2021/8/15  初版。
 *
 * 【収録データ】
 * aura_bp <character> ＠キャラ_play:青白い粒子と集中線拡散
 * aura_bp2 <character> ＠キャラ_play:青白いサークル拡大
 * aura_static_b <character> ＠キャラ:もやもやのオーラ
 * aureole_c <character> ＠後光
 * barrier_c <character> ＠バリア
 * black_particle_w <weather> ＠天候:黒いパーティクル
 * blizard_w <weather> ＠天候:吹雪
 * bubble_c <character> ＠キャラ:キャラを包む泡。attach推奨
 * bubble_cp <character> ＠キャラ_play:穴から吹き出す泡
 * bubble_w <weather> ＠天候:水中の泡
 * charge_c <character> ＠エネルギー充填
 * charm_bw <weather> ＠天候:画面全体ハート
 * chest_c <character> ＠宝箱からあふれる光
 * click <click> ＠click:マウスクリック/タップ用1
 * click2 <click> ＠click:マウスクリック/タップ用2
 * cloud_shadow_w <screen> ＠天候:雲の影
 * cloud_w <screen> ＠天候:雲
 * cracker_l <character> ＠クラッカー：画面左から
 * cracker_min_l <character> ＠クラッカー(キャラ用・左から)
 * cracker_min_r <character> ＠クラッカー(キャラ用・右から)
 * cracker_r <character> ＠クラッカー：画面右から
 * dappled_r <region> ＠木漏れ日[リージョン]
 * dark_gate_c <character> ＠闇の扉
 * dark_hole_r <region> ＠リージョン:穴からキラキラ吹き上げる光
 * dark_hole_r_2 <region> ＠リージョン:穴から吹き上げる線形の光
 * dark_hole_r_3 <region> ＠リージョン:穴の中のもやもや
 * darkness_r <region> ＠闇フォグ[リージョン]
 * darkness_s <screen> ＠スクリーン:暗闇の視界制限
 * diamonddust_w <weather> ＠天候:キラキラ漂うダイヤモンドダスト
 * diamonddust_w2 <weather> ＠天候:キラキラ漂うダイヤモンドダスト2
 * dish_steam_c <character> ＠料理の湯気
 * drag <character> ＠drag:マウスドラッグ用
 * dust_w <weather> ＠埃[天候]
 * dust_walk <walk> ＠歩行:土煙
 * ether_sp <screen> ＠エーテル[画面演出
 * explode_cp_1 <character> ＠キャラ:爆発前のサークル収束
 * explode_cp_2 <character> ＠キャラ:爆発の炎
 * explode_cp_3 <character> ＠キャラ:爆発時のサークル発散
 * explode_cp_4 <character> ＠キャラ:爆発後のチカチカする円
 * feather_sp <screen> ＠不死鳥の羽[画面演出]
 * fire_c <character> ＠キャラ:大きな炎
 * fire_pillar_c <character> ＠キャラ:行き止まり用の炎の柱
 * fireworks_c <character> ＠キャラ:打ち上げ花火
 * fireworks_dragon_c <character> ＠キャラ:噴出タイプの花火
 * fish_w <weather> ＠天候:水中の影
 * flare_s <screen> ＠スクリーン:太陽光のフレア
 * flash_s <screen> ＠スクリーン:太陽光のフラッシュ
 * flower_walk <walk> ＠歩行:歩いた跡に花(タイル使用)
 * fog_shadow_w <screen> ＠天候:モヤの影
 * fog_w <weather> ＠天候:薄いフォグ
 * fog_w2 <screen> ＠天候:濃いめのモヤ
 * fuss_c <character> ＠キャラ:乱闘中っぽいアニメ調の煙
 * fuss_startdash <startdash> ＠スタートダッシュ:アニメ調の煙
 * fuss_walk <walk> ＠歩行:アニメ調の煙
 * fw_base <character> ＠花火~打ち上げ用[橙]
 * glitter_fade_cp <character> ＠きらきら消滅
 * glitter_sp <screen> ＠きらきら[画面演出]
 * gloom_sp <screen> ＠どんより[画面演出]
 * grass_walk <walk> ＠歩行:飛び散る草
 * hearts_sp <screen> ＠ハート[画面演出]
 * hologram_c <character> ＠ホログラム風
 * illumination_w <weather> ＠天候:カラフルなイルミネーション
 * item_gain <character> ＠アイテム取得演出
 * item_gain2 <character> ＠アイテム取得演出
 * item_gain3 <character> ＠アイテム取得演出
 * jump_fuss_cp <character> ＠ジャンプ時のアニメ調の煙
 * kira_blue_c <character> ＠キャラ:青いキラキラエフェクト
 * light_float_cp <character> ＠キャラ_play:光柱が頭上に向かって消える
 * light_floor_r <region> ＠リージョン:キラキラ点滅する小さな光粒
 * light_leak_s <screen> ＠スクリーン:淡いライトリーク
 * light_leak_s2 <screen> ＠スクリーン:青&緑のライトリーク
 * light_orange_c <character> ＠照明の光(オレンジ)
 * light_pillar_r <region> ＠リージョン:空エリアの光の柱
 * light_pillar_w <weather> ＠天候:上部からの光柱。横スク用マップ用
 * light_r <region> ＠region:テスト用1
 * lines_sp <screen> ＠集中線[画面演出]
 * magic_circle_c <character> ＠キャラ:魔法陣の幾何学エフェクト
 * magic_circle_c2 <character> ＠魔法陣から漏れる光
 * magma_r <region> ＠リージョン:マグマの床
 * mahoujin_c <character> ＠キャラ:魔法陣上のキラキラ光粒
 * mahoujin_c2 <character> ＠キャラ:魔法陣上の光線演出
 * monster_c <character> ＠キャラ:中央から光球が発生して上に
 * monster_cp <character> ＠キャラ:パーティクルが収束
 * monster_cp2 <character> ＠キャラ:集中線が発散。
 * mysterious_torch_c <character> ＠妖しい灯火
 * notes_sp <screen> ＠音符[画面演出]
 * orb_c <character> ＠キャラ:オーブの波動
 * orb_cp <character> ＠キャラ_play:青白いキラキラ光粒が発散
 * particle <character> ＠テスト用
 * particle_w <weather> ＠天候:ゆらゆら上昇する光粒
 * petal_w <weather> ＠天候:桜の花びら
 * poison_r <region> ＠リージョン:毒の沼
 * questions_sp <screen> ＠はてな[画面演出]
 * rain_fog_w <weather> ＠天候:雨天時のモヤ
 * rain_w <weather> ＠天候:しとしと雨
 * rain_w2 <weather> ＠天候:強めの雨
 * rain_w3 <weather> ＠天候:本降りの雨
 * ripple_r <region> ＠リージョン:水たまりの波紋
 * ripple_walk <walk> ＠歩行:水の波紋
 * smoke_c <character> ＠キャラ:焚き火の煙
 * smoke_c2 <character> ＠キャラ:fire用の大きな煙
 * snow_w <weather> ＠天候:うっすらと降る雪
 * snow_w2 <weather> ＠天候:雪の結晶
 * sparks_c <character> ＠キャラ:焚き火の火の粉
 * sparks_w <weather> ＠天候:薄っすらと舞い上がる火の粉
 * sparks_w2 <weather> ＠火の粉[天候]
 * splash_sp <screen> ＠水しぶき[画面演出]
 * splash_walk <walk> ＠歩行:水しぶき
 * stardust_w <weather> ＠スターダスト[天候]
 * statue_orb_c <character> ＠キャラ:石像のオーブから出る光粒
 * thunder_w <weather> ＠天候:ピカッと一瞬光る稲妻
 * thunder_w2 <weather> ＠天候:黄色の稲妻
 * warp0 <character> ＠ワープ演出
 * warp1 <character> ＠ワープ演出
 * warp2 <character> ＠ワープ演出
 * warp3 <character> ＠ワープ演出
 * warp_hole_c <character> ＠ワープホール
 * warp_hole_c2 <character> ＠ワープホール２
 * warp_red_c <character> ＠キャラ:赤魔法陣ワープの集中線
 * warp_red_cp <character> ＠キャラ:ワープ直後の幾何学エフェクト
 * window_lay_c <character> ＠窓からさす光
 * wing_l <character> ＠光の翼(左)
 * wing_l2 <character> ＠翼から出る光の粒(左)
 * wing_r <character> ＠光の翼(右)
 * wing_r2 <character> ＠翼から出る光の粒(右)
 *
 *
 * 【パーティクルグループ】
 * buff_sp <screen> ＠強化[画面演出]
 * chant_b1 <party> ＠詠唱1/青・六角形発散
 * chant_b2 <party> ＠詠唱2/赤・四角形収縮
 * chant_b3 <party> ＠詠唱3/青・ホログラムチック
 * chant_b4 <party> ＠詠唱4/青・六角形拡大→収縮
 * chant_b5 <party> ＠詠唱5/黒赤・六角形発散
 * commet <weather> ＠星空と彗星
 * crystal_c <character> ＠クリスタルのきらきら
 * crystal_cp <character> ＠クリスタル発動エフェクト
 * debuff_sp <screen> ＠弱体化[画面演出]
 * digital_01_w <weather> ＠01が並ぶ背景
 * digital_w <weather> ＠素早く切り替わる文字
 * fire_r <region> ＠床から炎[リージョン]
 * firefly <region> ＠蛍
 * fireworks <character> ＠打ち上げ花火
 * fw_change <character> ＠花火~色変化[橙]
 * fw_dual <character> ＠花火~２色[橙]
 * fw_kiku <character> ＠花火~菊(大)[橙]
 * fw_kikus <character> ＠花火~菊(小)[橙]
 * fw_simple <character> ＠花火~シンプル[橙]
 * fw_twin <character> ＠花火~V字噴出[橙]
 * fw_twinkle <character> ＠花火~キラキラ[橙]
 * item_gain <picture> ＠アイテム入手
 * matrix_w <weather> ＠マト○ックス風に文字が流れる演出
 * monster_cp <character> ＠モンスター召喚
 * narration_fire_s <weather> ＠ナレーション用、画面下部の炎
 * shrine_c <character> ＠祭壇の光
 * smithFire_c <character> ＠炉の火
 * smithHit_cp <character> ＠鍛冶の火花
 * splash_cp <character> ＠水しぶき
 * warp <character> ＠ワープ演出
 * warp_s <screen> ＠ワープ風[画面演出]
 * weapon_b1 <party> ＠剣先1/橙・光&集中線
 * weapon_b2 <party> ＠剣先2/青・四角収縮
 * weapon_b3 <party> ＠剣先3/炎
 * weapon_b4 <party> ＠剣先4/神聖
 * weapon_b5 <party> ＠剣先5/赤・六角形
 * weapon_b6 <party> ＠おまけ<要:アニメDarkness1>
 * weapon_b7 <party> ＠おまけ<要:アニメHitThunder>
 * wind_w <weather> ＠風の天候
 * wing <character> ＠光の翼
 *
 * @command set_character
 * @text set/表示 > character(45)
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
 * @option aura_static_b <character> ＠キャラ:もやもやのオーラ
 * @value aura_static_b
 * @option aureole_c <character> ＠後光
 * @value aureole_c
 * @option barrier_c <character> ＠バリア
 * @value barrier_c
 * @option bubble_c <character> ＠キャラ:キャラを包む泡。attach推奨
 * @value bubble_c
 * @option charge_c <character> ＠エネルギー充填
 * @value charge_c
 * @option chest_c <character> ＠宝箱からあふれる光
 * @value chest_c
 * @option dark_gate_c <character> ＠闇の扉
 * @value dark_gate_c
 * @option dish_steam_c <character> ＠料理の湯気
 * @value dish_steam_c
 * @option dust_walk <walk> ＠歩行:土煙
 * @value dust_walk
 * @option fire_c <character> ＠キャラ:大きな炎
 * @value fire_c
 * @option fire_pillar_c <character> ＠キャラ:行き止まり用の炎の柱
 * @value fire_pillar_c
 * @option fireworks_dragon_c <character> ＠キャラ:噴出タイプの花火
 * @value fireworks_dragon_c
 * @option flower_walk <walk> ＠歩行:歩いた跡に花(タイル使用)
 * @value flower_walk
 * @option fuss_walk <walk> ＠歩行:アニメ調の煙
 * @value fuss_walk
 * @option grass_walk <walk> ＠歩行:飛び散る草
 * @value grass_walk
 * @option hologram_c <character> ＠ホログラム風
 * @value hologram_c
 * @option item_gain <character> ＠アイテム取得演出
 * @value item_gain
 * @option item_gain2 <character> ＠アイテム取得演出
 * @value item_gain2
 * @option kira_blue_c <character> ＠キャラ:青いキラキラエフェクト
 * @value kira_blue_c
 * @option light_orange_c <character> ＠照明の光(オレンジ)
 * @value light_orange_c
 * @option magic_circle_c <character> ＠キャラ:魔法陣の幾何学エフェクト
 * @value magic_circle_c
 * @option magic_circle_c2 <character> ＠魔法陣から漏れる光
 * @value magic_circle_c2
 * @option mahoujin_c <character> ＠キャラ:魔法陣上のキラキラ光粒
 * @value mahoujin_c
 * @option mahoujin_c2 <character> ＠キャラ:魔法陣上の光線演出
 * @value mahoujin_c2
 * @option monster_c <character> ＠キャラ:中央から光球が発生して上に
 * @value monster_c
 * @option mysterious_torch_c <character> ＠妖しい灯火
 * @value mysterious_torch_c
 * @option orb_c <character> ＠キャラ:オーブの波動
 * @value orb_c
 * @option particle <character> ＠テスト用
 * @value particle
 * @option ripple_walk <walk> ＠歩行:水の波紋
 * @value ripple_walk
 * @option smoke_c <character> ＠キャラ:焚き火の煙
 * @value smoke_c
 * @option smoke_c2 <character> ＠キャラ:fire用の大きな煙
 * @value smoke_c2
 * @option sparks_c <character> ＠キャラ:焚き火の火の粉
 * @value sparks_c
 * @option splash_walk <walk> ＠歩行:水しぶき
 * @value splash_walk
 * @option statue_orb_c <character> ＠キャラ:石像のオーブから出る光粒
 * @value statue_orb_c
 * @option warp1 <character> ＠ワープ演出
 * @value warp1
 * @option warp2 <character> ＠ワープ演出
 * @value warp2
 * @option warp3 <character> ＠ワープ演出
 * @value warp3
 * @option warp_hole_c <character> ＠ワープホール
 * @value warp_hole_c
 * @option warp_hole_c2 <character> ＠ワープホール２
 * @value warp_hole_c2
 * @option warp_red_c <character> ＠キャラ:赤魔法陣ワープの集中線
 * @value warp_red_c
 * @option window_lay_c <character> ＠窓からさす光
 * @value window_lay_c
 * @option wing_l <character> ＠光の翼(左)
 * @value wing_l
 * @option wing_l2 <character> ＠翼から出る光の粒(左)
 * @value wing_l2
 * @option wing_r <character> ＠光の翼(右)
 * @value wing_r
 * @option wing_r2 <character> ＠翼から出る光の粒(右)
 * @value wing_r2
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
 * @text set/表示 > screen/weather/region(44)
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
 * @option black_particle_w <weather> ＠天候:黒いパーティクル
 * @value black_particle_w
 * @option blizard_w <weather> ＠天候:吹雪
 * @value blizard_w
 * @option bubble_w <weather> ＠天候:水中の泡
 * @value bubble_w
 * @option charm_bw <weather> ＠天候:画面全体ハート
 * @value charm_bw
 * @option cloud_shadow_w <screen> ＠天候:雲の影
 * @value cloud_shadow_w
 * @option cloud_w <screen> ＠天候:雲
 * @value cloud_w
 * @option dappled_r <region> ＠木漏れ日[リージョン]
 * @value dappled_r
 * @option dark_hole_r <region> ＠リージョン:穴からキラキラ吹き上げる光
 * @value dark_hole_r
 * @option dark_hole_r_2 <region> ＠リージョン:穴から吹き上げる線形の光
 * @value dark_hole_r_2
 * @option dark_hole_r_3 <region> ＠リージョン:穴の中のもやもや
 * @value dark_hole_r_3
 * @option darkness_r <region> ＠闇フォグ[リージョン]
 * @value darkness_r
 * @option darkness_s <screen> ＠スクリーン:暗闇の視界制限
 * @value darkness_s
 * @option diamonddust_w <weather> ＠天候:キラキラ漂うダイヤモンドダスト
 * @value diamonddust_w
 * @option diamonddust_w2 <weather> ＠天候:キラキラ漂うダイヤモンドダスト2
 * @value diamonddust_w2
 * @option dust_w <weather> ＠埃[天候]
 * @value dust_w
 * @option fish_w <weather> ＠天候:水中の影
 * @value fish_w
 * @option flare_s <screen> ＠スクリーン:太陽光のフレア
 * @value flare_s
 * @option flash_s <screen> ＠スクリーン:太陽光のフラッシュ
 * @value flash_s
 * @option fog_shadow_w <screen> ＠天候:モヤの影
 * @value fog_shadow_w
 * @option fog_w <weather> ＠天候:薄いフォグ
 * @value fog_w
 * @option fog_w2 <screen> ＠天候:濃いめのモヤ
 * @value fog_w2
 * @option illumination_w <weather> ＠天候:カラフルなイルミネーション
 * @value illumination_w
 * @option light_floor_r <region> ＠リージョン:キラキラ点滅する小さな光粒
 * @value light_floor_r
 * @option light_leak_s <screen> ＠スクリーン:淡いライトリーク
 * @value light_leak_s
 * @option light_leak_s2 <screen> ＠スクリーン:青&緑のライトリーク
 * @value light_leak_s2
 * @option light_pillar_r <region> ＠リージョン:空エリアの光の柱
 * @value light_pillar_r
 * @option light_pillar_w <weather> ＠天候:上部からの光柱。横スク用マップ用
 * @value light_pillar_w
 * @option light_r <region> ＠region:テスト用1
 * @value light_r
 * @option magma_r <region> ＠リージョン:マグマの床
 * @value magma_r
 * @option particle_w <weather> ＠天候:ゆらゆら上昇する光粒
 * @value particle_w
 * @option petal_w <weather> ＠天候:桜の花びら
 * @value petal_w
 * @option poison_r <region> ＠リージョン:毒の沼
 * @value poison_r
 * @option rain_fog_w <weather> ＠天候:雨天時のモヤ
 * @value rain_fog_w
 * @option rain_w <weather> ＠天候:しとしと雨
 * @value rain_w
 * @option rain_w2 <weather> ＠天候:強めの雨
 * @value rain_w2
 * @option rain_w3 <weather> ＠天候:本降りの雨
 * @value rain_w3
 * @option ripple_r <region> ＠リージョン:水たまりの波紋
 * @value ripple_r
 * @option snow_w <weather> ＠天候:うっすらと降る雪
 * @value snow_w
 * @option snow_w2 <weather> ＠天候:雪の結晶
 * @value snow_w2
 * @option sparks_w <weather> ＠天候:薄っすらと舞い上がる火の粉
 * @value sparks_w
 * @option sparks_w2 <weather> ＠火の粉[天候]
 * @value sparks_w2
 * @option stardust_w <weather> ＠スターダスト[天候]
 * @value stardust_w
 * @option thunder_w <weather> ＠天候:ピカッと一瞬光る稲妻
 * @value thunder_w
 * @option thunder_w2 <weather> ＠天候:黄色の稲妻
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
 * @command play_character
 * @text play/１回再生 > character(25)
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
 * @default weather
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 * @option aura_bp <character> ＠キャラ_play:青白い粒子と集中線拡散
 * @value aura_bp
 * @option aura_bp2 <character> ＠キャラ_play:青白いサークル拡大
 * @value aura_bp2
 * @option bubble_cp <character> ＠キャラ_play:穴から吹き出す泡
 * @value bubble_cp
 * @option cracker_l <character> ＠クラッカー：画面左から
 * @value cracker_l
 * @option cracker_min_l <character> ＠クラッカー(キャラ用・左から)
 * @value cracker_min_l
 * @option cracker_min_r <character> ＠クラッカー(キャラ用・右から)
 * @value cracker_min_r
 * @option cracker_r <character> ＠クラッカー：画面右から
 * @value cracker_r
 * @option drag <character> ＠drag:マウスドラッグ用
 * @value drag
 * @option explode_cp_1 <character> ＠キャラ:爆発前のサークル収束
 * @value explode_cp_1
 * @option explode_cp_2 <character> ＠キャラ:爆発の炎
 * @value explode_cp_2
 * @option explode_cp_3 <character> ＠キャラ:爆発時のサークル発散
 * @value explode_cp_3
 * @option explode_cp_4 <character> ＠キャラ:爆発後のチカチカする円
 * @value explode_cp_4
 * @option fireworks_c <character> ＠キャラ:打ち上げ花火
 * @value fireworks_c
 * @option fuss_c <character> ＠キャラ:乱闘中っぽいアニメ調の煙
 * @value fuss_c
 * @option fuss_startdash <startdash> ＠スタートダッシュ:アニメ調の煙
 * @value fuss_startdash
 * @option fw_base <character> ＠花火~打ち上げ用[橙]
 * @value fw_base
 * @option glitter_fade_cp <character> ＠きらきら消滅
 * @value glitter_fade_cp
 * @option item_gain3 <character> ＠アイテム取得演出
 * @value item_gain3
 * @option jump_fuss_cp <character> ＠ジャンプ時のアニメ調の煙
 * @value jump_fuss_cp
 * @option light_float_cp <character> ＠キャラ_play:光柱が頭上に向かって消える
 * @value light_float_cp
 * @option monster_cp <character> ＠キャラ:パーティクルが収束
 * @value monster_cp
 * @option monster_cp2 <character> ＠キャラ:集中線が発散。
 * @value monster_cp2
 * @option orb_cp <character> ＠キャラ_play:青白いキラキラ光粒が発散
 * @value orb_cp
 * @option warp0 <character> ＠ワープ演出
 * @value warp0
 * @option warp_red_cp <character> ＠キャラ:ワープ直後の幾何学エフェクト
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
 * @command play_screen
 * @text play/１回再生 > screen/weather/region(9)
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
 * @option ether_sp <screen> ＠エーテル[画面演出
 * @value ether_sp
 * @option feather_sp <screen> ＠不死鳥の羽[画面演出]
 * @value feather_sp
 * @option glitter_sp <screen> ＠きらきら[画面演出]
 * @value glitter_sp
 * @option gloom_sp <screen> ＠どんより[画面演出]
 * @value gloom_sp
 * @option hearts_sp <screen> ＠ハート[画面演出]
 * @value hearts_sp
 * @option lines_sp <screen> ＠集中線[画面演出]
 * @value lines_sp
 * @option notes_sp <screen> ＠音符[画面演出]
 * @value notes_sp
 * @option questions_sp <screen> ＠はてな[画面演出]
 * @value questions_sp
 * @option splash_sp <screen> ＠水しぶき[画面演出]
 * @value splash_sp
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
 * @text play/１回再生 > click/drag(2)
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
 * @default weather
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 * @option click <click> ＠click:マウスクリック/タップ用1
 * @value click
 * @option click2 <click> ＠click:マウスクリック/タップ用2
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
 *
 *
 * @command group_character
 * @text group/グループ > character(7)
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
 * @option crystal_c <character> ＠2021/9/22
 * @value crystal_c
 * @option magma_r2 <character> ＠2021/8/18
 * @value magma_r2
 * @option meteor <character> ＠2021/10/27
 * @value meteor
 * @option shrine_c <character> ＠2021/9/22
 * @value shrine_c
 * @option smithFire_c <character> ＠2021/9/22
 * @value smithFire_c
 * @option smithHit <character> ＠2021/9/22
 * @value smithHit
 * @option test <character> ＠2021/11/4
 * @value test
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
 * @text group/グループ > screen/weather/region(1)
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
 * @option fire_r <region> ＠2021/8/18
 * @value fire_r
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
 * @command group_others
 * @text group/グループ > Others(12)
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
 * @option skill1 <party> ＠2021/11/5
 * @value skill1
 * @option skill10 <party> ＠2021/11/5
 * @value skill10
 * @option skill11 <party> ＠2021/11/5
 * @value skill11
 * @option skill12 <party> ＠2021/11/5
 * @value skill12
 * @option skill2 <party> ＠2021/11/5
 * @value skill2
 * @option skill3 <party> ＠2021/11/5
 * @value skill3
 * @option skill4 <party> ＠2021/11/5
 * @value skill4
 * @option skill5 <party> ＠2021/11/5
 * @value skill5
 * @option skill6 <party> ＠2021/11/5
 * @value skill6
 * @option skill7 <party> ＠2021/11/6
 * @value skill7
 * @option skill8 <party> ＠2021/11/5
 * @value skill8
 * @option skill9 <party> ＠2021/11/5
 * @value skill9
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
 *
 * @command group_character
 * @text group/グループ > character(17)
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
 * @option crystal_c <character> ＠クリスタルのきらきら
 * @value crystal_c
 * @option crystal_cp <character> ＠クリスタル発動エフェクト
 * @value crystal_cp
 * @option fireworks <character> ＠打ち上げ花火
 * @value fireworks
 * @option fw_change <character> ＠花火~色変化[橙]
 * @value fw_change
 * @option fw_dual <character> ＠花火~２色[橙]
 * @value fw_dual
 * @option fw_kiku <character> ＠花火~菊(大)[橙]
 * @value fw_kiku
 * @option fw_kikus <character> ＠花火~菊(小)[橙]
 * @value fw_kikus
 * @option fw_simple <character> ＠花火~シンプル[橙]
 * @value fw_simple
 * @option fw_twin <character> ＠花火~V字噴出[橙]
 * @value fw_twin
 * @option fw_twinkle <character> ＠花火~キラキラ[橙]
 * @value fw_twinkle
 * @option monster_cp <character> ＠モンスター召喚
 * @value monster_cp
 * @option shrine_c <character> ＠祭壇の光
 * @value shrine_c
 * @option smithFire_c <character> ＠炉の火
 * @value smithFire_c
 * @option smithHit_cp <character> ＠鍛冶の火花
 * @value smithHit_cp
 * @option splash_cp <character> ＠水しぶき
 * @value splash_cp
 * @option warp <character> ＠ワープ演出
 * @value warp
 * @option wing <character> ＠光の翼
 * @value wing
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
 * @text group/グループ > screen/weather/region(11)
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
 * @option buff_sp <screen> ＠強化[画面演出]
 * @value buff_sp
 * @option commet <weather> ＠星空と彗星
 * @value commet
 * @option debuff_sp <screen> ＠弱体化[画面演出]
 * @value debuff_sp
 * @option digital_01_w <weather> ＠01が並ぶ背景
 * @value digital_01_w
 * @option digital_w <weather> ＠素早く切り替わる文字
 * @value digital_w
 * @option fire_r <region> ＠床から炎[リージョン]
 * @value fire_r
 * @option firefly <region> ＠蛍
 * @value firefly
 * @option matrix_w <weather> ＠マト○ックス風に文字が流れる演出
 * @value matrix_w
 * @option narration_fire_s <weather> ＠ナレーション用、画面下部の炎
 * @value narration_fire_s
 * @option warp_s <screen> ＠ワープ風[画面演出]
 * @value warp_s
 * @option wind_w <weather> ＠風の天候
 * @value wind_w
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
 * @command group_others
 * @text group/グループ > Others(13)
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
 * @option chant_b1 <party> ＠詠唱1/青・六角形発散
 * @value chant_b1
 * @option chant_b2 <party> ＠詠唱2/赤・四角形収縮
 * @value chant_b2
 * @option chant_b3 <party> ＠詠唱3/青・ホログラムチック
 * @value chant_b3
 * @option chant_b4 <party> ＠詠唱4/青・六角形拡大→収縮
 * @value chant_b4
 * @option chant_b5 <party> ＠詠唱5/黒赤・六角形発散
 * @value chant_b5
 * @option item_gain <picture> ＠アイテム入手
 * @value item_gain
 * @option weapon_b1 <party> ＠剣先1/橙・光&集中線
 * @value weapon_b1
 * @option weapon_b2 <party> ＠剣先2/青・四角収縮
 * @value weapon_b2
 * @option weapon_b3 <party> ＠剣先3/炎
 * @value weapon_b3
 * @option weapon_b4 <party> ＠剣先4/神聖
 * @value weapon_b4
 * @option weapon_b5 <party> ＠剣先5/赤・六角形
 * @value weapon_b5
 * @option weapon_b6 <party> ＠おまけ<要:アニメDarkness1>
 * @value weapon_b6
 * @option weapon_b7 <party> ＠おまけ<要:アニメHitThunder>
 * @value weapon_b7
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
 * @command group_hidden
 * @text group/グループ > hidden(/h)(35)
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
 * @requiredAssets img/particles/line_oval3
 * @requiredAssets img/particles/hexagon_line1
 * @requiredAssets img/particles/hexagon_line1g
 * @requiredAssets img/particles/hexagon_line3
 * @requiredAssets img/particles/hexagon1
 * @requiredAssets img/particles/particle8
 * @requiredAssets img/particles/flare
 * @requiredAssets img/particles/particle9
 * @requiredAssets img/particles/smoke2
 * @requiredAssets img/particles/smoke1
 * @requiredAssets img/particles/smog1
 * @requiredAssets img/particles/flame1g
 * @requiredAssets img/particles/snow_particle2
 * @requiredAssets img/particles/hexagon_line3g
 * @requiredAssets img/particles/hexagon1g
 * @requiredAssets img/particles/hexagon_line2
 * @requiredAssets img/particles/square_line2
 * @requiredAssets img/particles/square_line1
 * @requiredAssets img/particles/square1
 * @requiredAssets img/particles/flare2
 * @requiredAssets img/particles/shine_thin3
 * @requiredAssets img/particles/line1
 * @requiredAssets img/particles/square3
 * @requiredAssets img/particles/circle3g
 * @requiredAssets img/particles/circle2g
 * @requiredAssets img/particles/petal2g
 * @requiredAssets img/particles/line_ray2f
 * @requiredAssets img/particles/line_ray2
 * @requiredAssets img/particles/particle7
 * @requiredAssets img/particles/line_oval1
 * @requiredAssets img/particles/leaf1
 * @requiredAssets img/particles/snow_particle2g
 * @requiredAssets img/particles/cloud3
 * @requiredAssets img/particles/line_ray1
 * @requiredAssets img/particles/line_ray3f
 * @requiredAssets img/particles/particle5
 * @requiredAssets img/particles/snow_particle1
 * @requiredAssets img/particles/bubble1
 * @requiredAssets img/particles/heart4g
 * @requiredAssets img/particles/shine3
 * @requiredAssets img/particles/particle1
 * @requiredAssets img/particles/circle
 * @requiredAssets img/particles/cloud2
 * @requiredAssets img/particles/cloud1
 * @requiredAssets img/particles/shine2
 * @requiredAssets img/particles/line_ray1f
 * @requiredAssets img/particles/particle6
 * @requiredAssets img/particles/particle4
 * @requiredAssets img/particles/smog2
 * @requiredAssets img/particles/cloud2s
 * @requiredAssets img/particles/particle2
 * @requiredAssets img/particles/dust1g
 * @requiredAssets img/particles/dust2g
 * @requiredAssets img/particles/dust4g
 * @requiredAssets img/particles/dust3g
 * @requiredAssets img/particles/circle2
 * @requiredAssets img/particles/fish1
 * @requiredAssets img/particles/cartoon_fuss2
 * @requiredAssets img/particles/cartoon_fuss1
 * @requiredAssets img/particles/shine1g
 * @requiredAssets img/particles/shine_thin1g
 * @requiredAssets img/particles/line_oval2
 * @requiredAssets img/particles/flame1
 * @requiredAssets img/particles/heart1g
 * @requiredAssets img/particles/square1g
 * @requiredAssets img/particles/square5g
 * @requiredAssets img/particles/line_rain1
 * @requiredAssets img/particles/line2
 * @requiredAssets img/particles/note1
 * @requiredAssets img/particles/note_tuplet1
 * @requiredAssets img/particles/ripple1g
 * @requiredAssets img/particles/petal1
 * @requiredAssets img/particles/question1
 * @requiredAssets img/particles/line_rain2
 * @requiredAssets img/particles/ripple2
 * @requiredAssets img/particles/snow2
 * @requiredAssets img/particles/snow5g
 * @requiredAssets img/particles/thunder1
 * @requiredAssets img/particles/thunder2
 */
//PRAGMA_END: exPresetHeader


var $dataTrpParticlePreset;
var $dataTrpParticleGroupsPreset;



(()=>{
'use strict';

/* groups
===================================*/
$dataTrpParticleGroupsPreset = {
	//キャラ
	splash_cp:{"repeat":-1,"list":["play _auto:0 target","play _auto:1 target"],"targetType":0,"comment":
		"水しぶき"},
	monster_cp:{"repeat":-1,"list":["play _auto:0 target","play _auto:1 target"],"targetType":0,"comment":
		"モンスター召喚"},
	smithHit_cp:{"repeat":-1,"list":["play _auto:0 target","play _auto:1 target"],"targetType":0,"comment":
		"鍛冶の火花"},
	smithFire_c:{"repeat":-1,"list":["set _auto:0 target def","set _auto:1 target"],"targetType":0,"comment":
		"炉の火"},
	shrine_c:{"repeat":-1,"list":["set _auto:0 target","set _auto:1 target","set _auto:2 target","set _auto:3 target"],"targetType":0,"comment":
		"祭壇の光"},
	crystal_c:{"repeat":-1,"list":["set _auto:0 target","set _auto:1 target"],"targetType":0,"comment":
		"クリスタルのきらきら"},
	crystal_cp:{"repeat":-1,"list":["play _auto:0 target","play _auto:1 target"],"targetType":0,"comment":
		"クリスタル発動エフェクト"},

	//ナレーション
	warp_s:{"repeat":-1,"list":["set _auto:0 target","set _auto:1 target"],"targetType":5,"comment":
		"ワープ風[画面演出]"},

	//画面効果
	buff_sp:{"repeat":-1,"list":["play _auto:0 target","play _auto:2 target","play _auto:1 target","play _auto:3 target"],"targetType":5,"comment":
		"強化[画面演出]"},
	debuff_sp:{"repeat":-1,"list":["play _auto:0 target","play _auto:3 target","play _auto:1 target","play _auto:2 target"],"targetType":5,"comment":
		"弱体化[画面演出]"},

	//リージョン
	fire_r:{"repeat":-1,"list":["set _auto:0 target","sub set _auto:0 _sub:0 0 -1 0 0 0","sub set _auto:0 _sub:1 0 -1 0 0 0"],"targetType":7,"comment":
		"床から炎[リージョン]"},

	//スキル使用者エフェクト
	weapon_b1:{"repeat":-1,"list":["wait 20","play _auto:0 target","play _auto:1 target","wait 5","flash 255 255 64 128 30"],"targetType":8,"comment":
		"剣先1/橙・光&集中線"},
	weapon_b2:{"repeat":-1,"list":["wait 25","play _auto:0 target","flash 150 150 255 128 30"],"targetType":8,"comment":
		"剣先2/青・四角収縮"},
	weapon_b3:{"repeat":-1,"list":["wait 20","play _auto:0 target","wait 3","play _auto:1 target","flash 255 32 32 64 30"],"targetType":8,"comment":
		"剣先3/炎"},
	weapon_b4:{"repeat":-1,"list":["wait 20","play _auto:0 target","flash 200 255 255 96 45"],"targetType":8,"comment":
		"剣先4/神聖"},
	weapon_b5:{"repeat":-1,"list":["wait 20","play _auto:0 target","wait 5","flash 255 0 0 64 30"],"targetType":8,"comment":
		"剣先5/赤・六角形"},
	weapon_b6:{"repeat":-1,"list":["wait 20","play _auto:0 target","play _auto:1 target","wait 5","flash 0 0 0 64 30"],"targetType":8,"comment":
		"おまけ<要:アニメDarkness1>"},
	weapon_b7:{"repeat":-1,"list":["wait 25","play _auto:0 target","play _auto:1 target","flash 200 200 255 32 30"],"targetType":8,"comment":
		"おまけ<要:アニメHitThunder>"},

	chant_b1:{"repeat":-1,"list":["wait 20","play _auto:0 target","play _auto:1 target","flash 128 255 255 128 30"],"targetType":8,"comment":
		"詠唱1/青・六角形発散"},
	chant_b2:{"repeat":-1,"list":["wait 20","play _auto:0 target","flash 255 96 96 128 60"],"targetType":8,"comment":
		"詠唱2/赤・四角形収縮"},
	chant_b3:{"repeat":-1,"list":["wait 20","play _auto:0 target","play _auto:1 target","flash 128 255 255 128 30"],"targetType":8,"comment":
		"詠唱3/青・ホログラムチック"},
	chant_b4:{"repeat":-1,"list":["wait 20","play _auto:0 target","flash 128 255 255 128 60"],"targetType":8,"comment":
		"詠唱4/青・六角形拡大→収縮"},
	chant_b5:{"repeat":-1,"list":["wait 25","play _auto:0 target","play _auto:1 target","flash 80 0 30 32 30"],"targetType":8,"comment":
		"詠唱5/黒赤・六角形発散"},

	
	/* メイン
	===================================*/
	"commet":{"repeat":-1,"list":["set starry_sky/h screen def back","exceed starry_sky/h 1","set commet/h weather def back","sub set commet/h _sub:0 0 -1 0.1 1","sub set commet/h _sub:1 0 -1 0.2 1"],"targetType":6,"comment":"星空と彗星"},
	"firefly":{"repeat":-1,"list":["set firefly/h target","sub set firefly/h _sub:0 0 -1 0.3 1"],"targetType":7,"comment":"蛍"},
	"fireworks":{"repeat":-1,"list":["set fireworks_shot/h this def back","sub set fireworks_shot/h _sub:0 1 -1 0 0","sub set fireworks_shot/h _sub:1 0 0.75 0.5 1"],"targetType":0,"comment":"打ち上げ花火"},

	
};


/* particles
===================================*/
$dataTrpParticlePreset = {
	//キャラ
	dark_gate_c:[4,[[0,0,0.5,1,1,0]],[[0,1.8,1,0],0.3],[[0,180,1,0],0],[[0,"#3714ff",1,"#a0094f"]],0,[0,0],null,[-200,20],[0,0],0,0,0,[0.3,0.8],2,0.04,1,2,-1,10000,[0,0],0,[0,-24],null,0,0,"particle6,particle8,particle4",0,
		"闇の扉"],
	glitter_fade_cp:[4,[[0,1,0.1,0,0.2,1,0.3,0,0.4,0,0.5,1,0.6,0,0.7,1,0.8,0,0.9,1,1,0]],[[0,1.5,0.8,0.6,1,0],0.5],[[0,500,0.2,100,1,0],0.5],[[0,"#1e5aff",1,"#a6c8ff"]],1,[0,0],null,[0,0],[0,0],0,0,0,[0.4,0.6],1,0.02,1,5,0.2,10000,[0,0],3,[0,0],[0,-24,20,48],0,0,"shine2",0,
		"きらきら消滅"],
	warp_hole_c:[4,[[0,0,0.5,1,1,0]],[[0,0,0.5,4,1,0],0.4],[[0,1,1,220],1],[[0,"#5105ad",1,"#823cd6"]],0,[0,0],null,[0,360],[0,0],0,0,0,[1,1],2,0.02,1,1,-1,10000,[0,0],0,[0,-24],null,0,0,"particle1",0,
		"ワープホール"],
	warp_hole_c2:[4,[[0,0,0.5,1,1,0]],[[0,2,0.5,2,1,2],0.3],[[0,0,1,0],1],[[0,"#8900d2",1,"#ffffff"]],0,[0,0],null,[0,0],[0,0],0,0,0,[1,1],1,0.01,1,1,-1,10000,[10,0.1],3,[0,0],[0,-24,0,120],0,0,"line_ray1",0,
		"ワープホール２"],
	hologram_c:[4,[[0,0,0.1,1,1,0]],[[0,0.2,0.9,0.2,1,0],0.5],[[0,0,1,0],0.3],[[0,"#1e80ff",1,"#656dfd"]],1,[0,0],null,[0,0],[0,0],0,0,0,[1.5,3],1,0.05,1,1,-1,10000,[0,0],1,[0,0],[-36,-84,72,72],0,0,"square1g,square5g",0,
		"ホログラム風"],
	mysterious_torch_c:[4,[[0,0,0.5,1,1,0]],[[0,0.25,1,0],0.5],[[0,50,1,50],0.5],[[0,"#2407ff",1,"#cdd8ff"]],0,[0,-40],null,[-90,-90],[-120,120],0,0,0,[0.5,1.5],1,0.08,0,1,-1,10000,[0,0],0,[0,-12],null,0,0,"flare",0,
		"妖しい灯火"],
	chest_c:[4,[[0,0,0.5,1,1,0]],[[0,0,0.2,0.35,0.5,0.35,1,0],0.3],[[0,0,1,0],0.2],[[0,"#5697ff",0.5,"#fff952",1,"#3492c4"]],1,[0,0],null,[-90,-90],[0,0],0,0,0,[0.5,1.2],1,0.05,1,0,-1,10000,[0,0],1,[0,0],[-18,-18,36,0],0,0,"shine3",0,
		"宝箱からあふれる光"],
	aureole_c:[4,[[0,0,0.2,0.4,0.8,0.4,1,0]],[[0,1,1,1],0.6],[[0,0,1,0],1],[[0,"#f3ffd1",0.5,"#fdffe6",1,"#f5f6e0"]],1,[0,0],null,[0,0],[0,0],0,0,0,[1,2],1,0.03,1,0,-1,10000,[0,0],3,[0,0],[0,-18,72,72],0,0,"line_ray1,line_ray3f",0,
		"後光"],
	barrier_c:[4,[[0,0,0.5,1,1,0]],[[0,0.3,1,0],0.5],[[0,200,1,0],1],[[0,"#3561ff",1,"#84b9ea"]],0,[0,0],null,[0,360],[0,0],0,0,0,[1,1],1,0.012,1,0,-1,60,[0,0],0,[0,-48],null,0,0,"flare",0,
		"バリア"],
	charge_c:[4,[[0,0,0.1,1,0.7,1,1,0]],[[0,0,0.7,1,1,3],0.3],[[0,-100,1,-100],1],[[0,"#583bff",1,"#e3d6ff"]],0,[0,0],null,[0,0],[0,0],0,0,0,[1.2,1.2],1,0.07,1,2,-1,10000,[0,0],3,[0,0],[0,-48,120,120],0,0,"particle9",0,
		"エネルギー充填"],
	magic_circle_c2:[4,[[0,0,0.15,1,1,0]],[[0,0,0.15,0.2,1,0],0.3],[[0,40,1,0],0.5],[[0,"#56ff89",0.5,"#52fffc",1,"#b3ff25"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[4,3],1,0.3,1,0,-1,10000,[10,0.05],2,[0,0],[0,-18,24,0],0,0,"particle9",0,
		"魔法陣から漏れる光"],
	window_lay_c:[4,[[0,0.1,1,0.1]],[[0,1.2,1,1.2],1],[[0,0,1,0],1],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[90,90],[0,0],0,0,0,[1,1],1,1,1,10,-1,10000,[0,0],4,[-8,0],[0,0,0,1,0,2,0],0,0,"line_ray2f",0,
		"窓からさす光"],

	//漫符
	lines_sp:[4,[[0,0,0.4,0.6,0.6,0.6,1,0]],[[0,1.2,1,1.2],0.4],[[0,500,0.2,50,1,0],0.4],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[0,0],[0,0],0,0,0,[0.5,1],1,0.003,1,2,0.2,10000,[0,0],3,[0,0],[0,0,400,200],0,0,"line_rain1",5,
		"集中線[画面演出]"],
	notes_sp:[4,[[0,0,0.5,1,0.8,1,1,0]],[[0,0,0.2,1.6,0.3,1.3,0.7,1.3,0.8,1.8,1,0],0.3],[[0,0,1,0],1],[[0,"#98f0ff",0.25,"#ffffff",0.5,"#ffde7b",0.75,"#ffffff",1,"#8bff91"]],1,[0,0],null,[0,0],[-25,25],90,0,0,[0.5,0.9],0,0.006,1,1,0.24,10000,[0,0],3,[0,0],[0,0,410,200],0,0,"note1,note_tuplet1",5,
		"音符[画面演出]"],
	splash_sp:[4,[[0,0,0.3,1,1,0]],[[0,3,0.1,1,1,0],0.3],[[0,1800,1,0],0.3],[[0,"#bfebfb",1,"#8fa0ff"]],1,[0,150],null,[-160,-20],[0,0],0,0,0,[0.2,0.6],1,0.002,1,3,0.1,100000,[0,0],1,[0,64],[0,-50,0,200],0,0,"snow_particle2",5,
		"水しぶき[画面演出]"],
	gloom_sp:[4,[[0,0,0.25,1,0.67,1,1,0]],[[0,2.2,1,2.2],0.4],[[0,500,0.25,100,1,0],1],[[0,"#090e62",1,"#888ef1"]],1,[0,0],null,[90,90],[0,0],0,0,0,[1,1.5],0,0.01,1,1,0.4,10000,[0,0],1,[0,0],[-408,-380,816,0],0,0,"line_oval2",5,
		"どんより[画面演出]"],
	glitter_sp:[4,[[0,0,0.5,1,0.8,1,1,0]],[[0,0,0.2,1.4,0.3,1.15,0.7,1.15,0.8,1.55,1,0],0.2],[[0,0,1,0],1],[[0,"#ffee27",0.25,"#ffffff",0.5,"#b7ffb2",0.75,"#ffffff",1,"#bde9ff"]],1,[0,0],null,[0,0],[-25,25],90,0,0,[0.8,1.2],0,0.005,1,1,0.3,10000,[0,0],3,[0,0],[0,0,240,410],0,0,"shine1g,shine_thin1g",5,
		"きらきら[画面演出]"],
	hearts_sp:[4,[[0,0,0.5,1,0.8,1,1,0]],[[0,0,0.2,1.2,0.3,0.8,0.7,0.8,0.8,1.2,1,0],0.2],[[0,0,1,0],1],[[0,"#d77bff",1,"#ffece4"]],1,[0,0],null,[-30,30],[-30,30],0,0,0,[0.8,1.5],0,0.006,1,1,0.25,10000,[0,0],1,[0,0],[-408,-312,816,624],0,0,"heart1g",5,
		"ハート[画面演出]"],
	questions_sp:[4,[[0,0,0.3,1,0.8,1,1,0]],[[0,0,0.2,1.5,0.3,1,0.7,1,0.8,1.5,1,0],0.2],[[0,0,1,0],1],[[0,"#ffffff",0.5,"#2388f3",1,"#19c62b"]],1,[0,0],null,[-30,30],[0,200],90,0,0,[1.5,1.7],0,0.009,1,1,0.5,10000,[0,0],3,[0,0],[0,0,410,180],0,0,"question1",5,
		"はてな[画面演出]"],

	//画面効果
	feather_sp:[4,[[0,0,0.5,1,1,0]],[[0,20,0.5,5,1,0],0.5],[[0,500,1,0],1],[[0,"#ff0000",1,"#ffffff"]],0,[0,0],null,[180,180],[90,-90],-1,2,0,[2,2],1,0.15,1,1,1,10000,[0,0],3,[0,0],[0,0,400,400],0,0,"petal2g",5,
		"不死鳥の羽[画面演出]"],
	ether_sp:[4,[[0,0,0.5,1,1,0]],[[0,0,0.5,1,1,0],0.3],[[0,150,1,0],0.3],[[0,"#00ff04",1,"#ffffff"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1,2],1,0.02,1,1,1.5,10000,[10,0.1],1,[0,0],[-408,-312,816,624],0,0,"particle8",5,
		"エーテル[画面演出"],

	//天候
	"stardust_w":{"alpha":{"list":[{"time":0,"value":0},{"time":0.1,"value":1},{"time":0.2,"value":0},{"time":0.3,"value":1},{"time":0.4,"value":0},{"time":0.5,"value":1},{"time":0.6,"value":0},{"time":0.7,"value":0},{"time":0.8,"value":1},{"time":0.9,"value":0},{"time":1,"value":0}]},"scale":{"list":[{"time":0,"value":0},{"time":0.2,"value":0.1},{"time":0.5,"value":0.1},{"time":1,"value":0}],"minimumScaleMultiplier":0.5},"speed":{"list":[{"time":0,"value":1},{"time":1,"value":30}],"minimumSpeedMultiplier":1},"color":{"list":[{"time":0,"value":"#56ffe6"},{"time":0.5,"value":"#52d1ff"},{"time":1,"value":"#2542ff"}]},"colorMode":1,"acceleration":{"x":0,"y":0},"maxSpeed":null,"startRotation":{"min":-90,"max":-90},"noRotation":false,"rotationSpeed":{"min":0,"max":0},"angle":0,"mirrorType":0,"orderedArt":0,"lifetime":{"min":1,"max":1},"blendMode":"ADD","frequency":0.01,"spawnChance":1,"particlesPerWave":0,"emitterLifetime":-1,"maxParticles":10000,"fluctuation":{"max":20,"sensitivity":0.01},"spawnType":"rect","pos":{"x":0,"y":0},"spawnRect":{"x":-408,"y":-312,"w":816,"h":624},"spawnCircle":null,"particleSpacing":0,"angleStart":0,"bdt":0,"brt":0,"br":0,"bdr":0,"bdx":0,"bdy":0,"addAtBack":false,"image":"particle8","targetType":6,
		"comment":"スターダスト[天候]"},
	sparks_w2:[4,[[0,1,1,1]],[[0,0,0.5,0.6,1,0],0.3],[[0,200,1,0],0.3],[[0,"#ff482d",1,"#f37b3f"]],1,[0,0],null,[-90,-90],[0,0],0,0,0,[2,4],1,0.05,1,1,-1,10000,[10,0.1],1,[0,0],[-408,-312,816,624],0,0,"dust2g,dust4g,dust1g,dust3g",6,
		"火の粉[天候]"],
	dust_w:[4,[[0,0,0.1,0.8,0.8,0.8,1,0]],[[0,0.4,1,0.4],0.3],[[0,25,0.8,12,1,0],0.4],[[0,"#ffffff",1,"#ffffff"]],1,[0,0],null,[-90,-90],[0,0],0,0,0,[3,5],0,0.07,1,1,-1,10000,[10,0.1],1,[0,0],[-408,-312,816,624],0,0,"dust1g,dust2g,dust4g,dust3g",6,
		"埃[天候]"],

	//リージョン
	darkness_r:[4,[[0,0,0.5,1,1,0]],[[0,2.5,1,2.5],0.5],[[0,0,1,0],1],[[0,"#890089",1,"#0044ff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[1,2],2,0.5,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"smog2",7,
		"闇フォグ[リージョン]"],
	dappled_r:[4,[[0,0,0.4,0.5,0.6,0.5,1,0]],[[0,4,1,4],0.5],[[0,0,1,0],0.5],[[0,"#ffffef",1,"#ffffef"]],0,[0,0],null,[65,65],[0,0],0,0,0,[4,8],1,0.8,0.6,0,-1,10000,[0,0],1,[0,0],[-100,-350,200,500],0,0,"line_ray1f",7,
		"木漏れ日[リージョン]"],

	//グループ用
	"_auto:0:splash_cp/h":[4,[[0,0,0.3,0.6,1,0]],[[0,1,0.1,0.5,1,0],0.3],[[0,400,1,0],0.4],[[0,"#cbd3ff",1,"#8fa0ff"]],1,[0,100],null,[-160,-120],[0,0],0,0,0,[0.1,0.6],1,0.003,1,1,0.1,60,[0,0],1,[0,0],[-6,-24,0,24],0,0,"snow_particle2",0,""],
	"_auto:1:splash_cp/h":[4,[[0,0,0.3,0.6,1,0]],[[0,1,0.1,0.5,1,0],0.3],[[0,400,1,0],0.4],[[0,"#cbd3ff",1,"#8fa0ff"]],1,[0,100],null,[-20,-60],[0,0],0,0,0,[0.1,0.6],1,0.003,1,1,0.1,60,[0,0],1,[0,0],[6,-24,0,24],0,0,"snow_particle2",0,""],
	"_auto:0:monster_cp/h":[4,[[0,1,1,0]],[[0,3,0.1,1,1,0],0.8],[[0,1000,0.1,100,1,1],0.5],[[0,"#5b17ea",1,"#9daaff"]],0,[0,-30],null,[-215,45],[0,0],0,0,0,[0.4,0.6],1,0.01,1,2,0.1,10000,[0,0],0,[0,-12],null,0,0,"particle9",0,""],
	"_auto:1:monster_cp/h":[4,[[0,1,1,0]],[[0,3,1,0],0.2],[[0,500,1,1],0.5],[[0,"#000e32",1,"#8059ff"]],1,[0,0],null,[-90,-90],[0,0],0,0,0,[0.4,0.8],1,0.005,1,1,0.15,10000,[0,0],1,[0,0],[-24,-110,48,0],0,0,"line_oval3",0,""],
	"_auto:0:smithHit_cp/h":[4,[[0,0,0.2,1,1,0]],[[0,0.3,0.2,0.15,1,0],0.1],[[0,600,0.1,80,1,0],0.2],[[0,"#ff9335",1,"#ff2929"]],0,[0,20],null,[-200,20],[0,0],0,2,0,[0.3,0.6],1,0.005,1,1,0.1,10000,[0,0],0,[0,-48],null,0,0,"particle8,flame1g",0,""],
	"_auto:1:smithHit_cp/h":[4,[[0,0.5,0.2,0.3,1,0]],[[0,0.5,1,0.5],1],[[0,0,1,0],1],[[0,"#ffd7a6",1,"#ffffff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[0.5,0.5],1,0.01,1,1,0.011,10000,[0,0],0,[0,-48],null,0,0,"flare",0,""],
	"_auto:0:smithFire_c/h":[4,[[0,0,0.3,0.5,0.5,0.5,1,0]],[[0,0,0.3,1.2,1,0],0.6],[[0,10,1,60],0.5],[[0,"#ff2e2e",1,"#ffb92e"]],0,[0,0],null,[-70,-110],[0,0],0,2,0,[0.6,0.6],1,0.1,1,1,-1,10000,[0,0],1,[0,-6],[-4,-4,8,0],0,0,"smog1",0,""],
	"_auto:1:smithFire_c/h":[4,[[0,0,0.5,1,1,0]],[[0,0,0.5,0.5,1,0],0.5],[[0,0,1,0],1],[[0,"#ff4747",1,"#ffab57"]],0,[0,0],null,[0,360],[0,0],0,0,0,[1,1],1,0.2,1,1,-1,10000,[0,0],0,[0,-6],null,0,0,"flare",0,""],
	"_auto:0:shrine_c/h":[4,[[0,0,0.2,1,0.5,1,1,0]],[[0,0,0.2,0.3,0.5,0.3,1,0],0.3],[[0,50,1,20],0.3],[[0,"#8defed",1,"#d4f5ff"]],0,[0,0],null,[-130,-50],[0,0],0,0,0,[3,4],1,0.6,0,0,-1,10000,[0,0],1,[0,0],[-32,0,64,0],0,0,"particle8",0,""],
	"_auto:1:shrine_c/h":[4,[[0,0,0.1,0.5,1,0]],[[0,0,0.08,0.5,1,0],0.5],[[0,1,0.2,10,1,0],0.8],[[0,"#e0e6ff",1,"#a3ffc8"]],0,[0,0],null,[-90,-90],[90,-90],-1,0,0,[2,3],1,0.3,1,0,-1,10000,[0,0],1,[0,0],[-16,-32,32,32],0,0,"shine_thin3",0,""],
	"_auto:2:shrine_c/h":[4,[[0,0,0.5,1,1,0]],[[0,0.5,1,0.5],0.5],[[0,20,1,20],1],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[90,90],[-30,30],270,0,0,[5,5],1,3,1,1,-1,10000,[5,0.05],1,[0,-200],[0,50,0,0],0,0,"petal2g",0,""],
	"_auto:3:shrine_c/h":[4,[[0,0,0.5,0.5,1,0]],[[0,2.5,1,2.5],0.9],[[0,0,1,0],1],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[90,90],[0,0],0,0,0,[1,1],1,0.5,1,1,-1,10000,[0,0],0,[0,-130],null,0,0,"line_ray2f",0,""],
	"_auto:0:crystal_c/h":[4,[[0,0,0.4,1,0.8,1,1,0]],[[0,0.6,0.4,0.2,1,0],0.4],[[0,50,0.4,35,1,10],0.5],[[0,"#8c84ff",1,"#8c84ff"]],0,[0,-5],null,[0,-180],[-100,100],0,0,0,[1.5,2],1,0.2,1,1,-1,10000,[0,0],1,[0,-12],[0,-48,0,48],0,0,"particle8",0,""],
	"_auto:1:crystal_c/h":[4,[[0,0,0.5,1,1,0]],[[0,0,0.5,0.3,1,0],0.5],[[0,0,1,0],1],[[0,"#b847ff",1,"#e357ff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[1,1],1,0.25,1,1,-1,10000,[0,0],0,[0,-48],null,0,0,"flare",0,""],
	"_auto:0:crystal_cp/h":[4,[[0,1,1,0]],[[0,3,1,0],0.2],[[0,300,1,1],0.5],[[0,"#2e4aff",1,"#ec8dff"]],1,[0,0],null,[-90,-90],[0,0],0,0,0,[0.5,1],1,0.008,1,1,0.2,10000,[0,0],2,[0,-130],[0,-20,36,0],0,0,"line_oval3",0,""],
	"_auto:1:crystal_cp/h":[4,[[0,0,0.1,1,0.6,1,1,0]],[[0,0.6,0.25,0.3,1,0.04],0.3],[[0,240,1,0],0.3],[[0,"#8e46ff",1,"#ffffff"]],0,[0,-100],null,[-90,-90],[0,0],0,0,0,[0.5,1],1,0.005,1,1,0.11,10000,[0,0],1,[0,0],[-32,0,64,0],0,0,"flare2",0,""],


	"_auto:0:warp_s/h":[4,[[0,0,0.5,1,1,0]],[[0,0,1,2],0.3],[[0,700,1,1000],1],[[0,"#9dccff",1,"#0c43ff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[0.75,1.1],1,0.18,1,8,-1,10000,[0,0],0,[0,0],null,0,0,"flare",5,""],
	"_auto:1:warp_s/h":[4,[[0,0,0.5,1,1,0]],[[0,0,0.5,2,1,0],0.5],[[0,1600,1,200],1],[[0,"#467eff",1,"#ffffff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[0.75,0.75],1,0.01,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"line_oval3",5,""],
	"_auto:0:buff_sp/h":[4,[[0,1,1,0]],[[0,5,1,0],0.2],[[0,300,1,1],0.5],[[0,"#ff852e",1,"#fff28d"]],1,[0,0],null,[-90,-90],[0,0],0,0,0,[0.5,1],1,0.005,1,1,0.15,10000,[0,0],1,[0,0],[-408,-312,816,624],0,0,"line_oval3",5,""],
	"_auto:1:buff_sp/h":[4,[[0,0,0.5,1,1,0]],[[0,0.8,1,0],0.5],[[0,400,1,0],0.1],[[0,"#ff5107",1,"#ffc927"]],1,[0,-30],null,[-90,-90],[-120,120],0,0,0,[0.5,1.5],1,0.004,1,1,0.2,10000,[0,0],1,[0,0],[-408,-312,816,624],0,0,"hexagon_line3g,hexagon1g",5,""],
	"_auto:2:buff_sp/h":[4,[[0,0.5,1,0]],[[0,5,1,0],0.2],[[0,300,1,1],0.5],[[0,"#ff852e",1,"#fff28d"]],1,[0,0],null,[-90,-90],[0,0],0,0,0,[0.5,1],0,0.005,1,1,0.15,10000,[0,0],1,[0,0],[-408,-312,816,624],0,0,"line_oval3",5,""],
	"_auto:3:buff_sp/h":[4,[[0,0,0.5,0.5,1,0]],[[0,0.8,1,0],0.5],[[0,400,1,0],0.1],[[0,"#ff5107",1,"#ffc927"]],1,[0,-30],null,[-90,-90],[-120,120],0,0,0,[0.5,1.5],0,0.004,1,1,0.2,10000,[0,0],1,[0,0],[-408,-312,816,624],0,0,"hexagon_line3g,hexagon1g",5,""],
	"_auto:0:debuff_sp/h":[4,[[0,0.5,1,0]],[[0,4,1,0],0.2],[[0,300,1,1],0.5],[[0,"#2e4aff",1,"#ec8dff"]],1,[0,0],null,[-90,-90],[0,0],0,0,0,[0.5,1],0,0.006,1,1,0.15,10000,[0,0],1,[0,0],[-408,-312,816,624],0,0,"line_oval3",5,""],
	"_auto:1:debuff_sp/h":[4,[[0,0,0.5,1,1,0]],[[0,0.8,1,0],0.5],[[0,400,1,0],0.1],[[0,"#cf00f6",1,"#0059ff"]],1,[0,-30],null,[-90,-90],[-120,120],0,0,0,[0.5,1.5],2,0.004,1,1,0.2,10000,[0,0],1,[0,0],[-408,-312,816,624],0,0,"hexagon_line3g,hexagon1g",5,""],
	"_auto:2:debuff_sp/h":[4,[[0,0,0.5,0.5,1,0]],[[0,0.8,1,0],0.5],[[0,400,1,0],0.1],[[0,"#cf00f6",1,"#0059ff"]],1,[0,-30],null,[-90,-90],[-120,120],0,0,0,[0.5,1.5],0,0.004,1,1,0.2,10000,[0,0],1,[0,0],[-408,-312,816,624],0,0,"hexagon_line3g,hexagon1g",5,""],
	"_auto:3:debuff_sp/h":[4,[[0,1,1,0]],[[0,4,1,0],0.2],[[0,300,1,1],0.5],[[0,"#2e4aff",1,"#ec8dff"]],1,[0,0],null,[-90,-90],[0,0],0,0,0,[0.5,1],2,0.006,1,1,0.15,10000,[0,0],1,[0,0],[-408,-312,816,624],0,0,"line_oval3",5,""],

	"_auto:0:fire_r/h":[4,[[0,0,1,0]],[[0,0,1,0],0.5],[[0,0,1,0],1],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[1,1],1,3,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"",7,""],
	"_sub:0:fire_r/h":[4,[[0,0,0.2,1,1,0]],[[0,0,0.2,0.5,1,0],0.6],[[0,1,1,125],0.9],[[0,"#ff824d",1,"#ff7d46"]],0,[0,0],null,[-90,-90],[0,0],0,2,0,[1.2,1.2],1,0.05,1,1,1,10000,[0,0],1,[0,0],[0,0,0,0],0,0,"flame1g",0,""],
	"_sub:1:fire_r/h":[4,[[0,0,0.5,0.8,1,0]],[[0,1,1,0.8],1],[[0,1,1,100],0.5],[[0,"#7b7b7b",0.5,"#525252",1,"#525252"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1.5,2],0,0.4,1,0,1,10000,[0,0],0,[0,-40],null,0,0,"smoke1,smoke2",0,""],

	"_auto:0:weapon_b1/h":[4,[[0,0,0.2,1,1,0]],[[0,1.5,0.2,0.8,1,0],0.5],[[0,1000,0.2,500,1,0],1],[[0,"#ff4d12",1,"#dd7c41"]],0,[0,0],null,[180,180],[0,0],0,0,0,[0.25,0.25],1,0.008,1,1,0.3,10000,[0,0],3,[0,0],[-48,-10,100,80],0,0,"particle8",8,""],
	"_auto:1:weapon_b1/h":[4,[[0,0,0.5,1,1,0]],[[0,10,0.2,2,1,0],1],[[0,1000,0.2,400,1,0],1],[[0,"#ffa304",1,"#ab7729"]],1,[0,0],null,[180,180],[0,0],0,0,0,[0.3,0.5],1,0.005,1,1,0.1,10000,[0,0],3,[0,0],[-48,-10,105,105],0,0,"line1",8,""],
	"_auto:0:weapon_b2/h":[4,[[0,0,0.25,0.5,0.5,0.5,0.8,0.1,1,0]],[[0,4,0.25,1,0.4,0.5,1,0],1],[[0,0,1,0],1],[[0,"#7d90ff",1,"#9d00bb"]],0,[0,0],null,[0,0],[400,400],0,0,0,[0.4,0.4],1,0.03,1,1,0.16,10000,[0,0],0,[-48,-10],null,0,0,"square3",8,""],
	"_auto:0:weapon_b3/h":[4,[[0,1,0.2,1,1,0]],[[0,0,0.2,0.4,1,0],0.5],[[0,1,1,100],0.6],[[0,"#ff5500",1,"#ff8d54"]],0,[0,0],null,[-90,-90],[0,0],0,2,0,[0.4,0.9],1,0.015,1,1,0.3,10000,[10,0.02],2,[0,0],[-42,-5,16,0],0,0,"flame1g",8,""],
	"_auto:1:weapon_b3/h":[4,[[0,0,0.2,0.2,1,0]],[[0,4,0.2,1,1,0],1],[[0,0,1,0],1],[[0,"#ff6619",1,"#ff6619"]],0,[0,0],null,[0,360],[0,0],0,0,0,[0.5,0.5],1,0.01,1,1,0.011,10000,[0,0],0,[-44,-6],null,0,0,"circle3g",8,""],
	"_auto:0:weapon_b4/h":[4,[[0,0,0.1,1,0.6,1,1,0]],[[0,1.5,0.25,0.6,1,0],0.1],[[0,150,1,0],0.5],[[0,"#3033ca",1,"#9b6ef1"]],0,[0,-300],null,[0,360],[0,0],0,0,0,[0.3,0.5],1,0.02,1,1,0.5,10000,[0,0],1,[0,0],[-32,-20,0,32],0,0,"particle8",8,""],
	"_auto:0:weapon_b5/h":[4,[[0,1,0.5,1,0.9,0.1,1,0]],[[0,0,0.6,0.8,0.9,1,1,2],1],[[0,1,1,1],1],[[0,"#ff0000",1,"#ffffff"]],0,[0,0],null,[0,0],[0,0],0,0,0,[0.6,0.6],0,0.01,1,0,0.05,10000,[0,0],0,[-48,-10],null,0,0,"hexagon_line1g",8,""],
	"_auto:0:weapon_b6/h":[4,[[0,0,0.5,0.8,1,0]],[[0,0.5,1,0],0.5],[[0,120,1,0],1],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[0,0],[180,1890],0,0,0,[1,1],2,0.01,1,1,0.2,10000,[0,0],3,[-48,-10],[0,0,0,0],0,0,"ANIM:Darkness1:12",8,""],
	"_auto:1:weapon_b6/h":[4,[[0,0,0.3,0.5,0.85,0.5,1,0]],[[0,4,0.2,2,0.8,1,1,0],1],[[0,1,1,1],0.8],[[0,"#0b23ff",1,"#d2d7ff"]],0,[0,0],null,[0,0],[240,240],0,0,0,[0.6,0.6],2,0.05,1,1,0.3,10000,[0,0],0,[-48,-10],null,0,0,"hexagon_line1",8,""],
	"_auto:0:weapon_b7/h":[4,[[0,1,0.5,1,1,0]],[[0,0,0.5,0.5,1,0.6],0.8],[[0,1,1,1],1],[[0,"#462dff",1,"#462dff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[0.4,0.4],1,0.05,1,4,0.3,10000,[0,0],0,[-48,-10],null,0,0,"ANIM:HitThunder:1",8,""],
	"_auto:1:weapon_b7/h":[4,[[0,0.5,1,0]],[[0,0,0.3,1,1,1.5],0.8],[[0,1,1,1],1],[[0,"#462dff",1,"#462dff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[0.4,0.4],1,0.01,1,4,0.011,10000,[0,0],0,[-48,-10],null,0,0,"circle2g",8,""],
	
	"_auto:0:chant_b1/h":[4,[[0,0,0.25,1,1,0]],[[0,0,0.25,1,0.8,1.5,1,4.2],0.8],[[0,1,1,1],0.8],[[0,"#62ff7f",1,"#1548ff"]],0,[0,0],null,[0,0],[120,120],0,0,0,[0.4,0.4],1,0.02,1,1,0.15,10000,[0,0],0,[0,0],null,0,0,"hexagon_line1",8,""],
	"_auto:1:chant_b1/h":[4,[[0,0,0.5,1,1,0]],[[0,0.4,0.8,0.4,1,0],0.5],[[0,800,0.2,20,1,35],0.7],[[0,"#005d5f",1,"#001aff"]],1,[0,0],null,[0,360],[-180,180],0,0,0,[0.6,1],1,0.012,1,6,0.1,10000,[0,0],4,[0,0],[60,0,0,0,0,0,0],0,0,"hexagon_line3,hexagon_line2,hexagon1",8,""],
	"_auto:0:chant_b2/h":[4,[[0,0,0.3,0.5,0.85,0.5,1,0]],[[0,6,0.2,2,0.8,1,1,0],1],[[0,1,1,1],0.8],[[0,"#ff0b99",1,"#ffffff"]],0,[0,0],null,[0,0],[240,240],0,0,0,[0.5,0.5],1,0.05,1,1,0.3,10000,[0,0],0,[0,0],null,0,0,"hexagon_line1",8,""],
	"_auto:0:chant_b3/h":[4,[[0,1,0.1,0,0.2,1,0.3,0,0.4,0,0.5,1,0.6,0,0.7,1,0.8,0,0.9,1,1,0]],[[0,0.5,0.8,0.25,1,0],0.3],[[0,350,0.2,100,1,0],0.3],[[0,"#142bf6",1,"#8c84ff"]],1,[0,0],null,[0,0],[0,0],0,0,0,[0.4,0.6],1,0.025,1,4,0.2,10000,[0,0],3,[0,0],[0,0,12,48],0,0,"hexagon_line1g",8,""],
	"_auto:1:chant_b3/h":[4,[[0,0,0.25,1,1,1]],[[0,0,0.1,0.2,1,0.4],0.1],[[0,0,1.5,0],0.5],[[0,"#6184e4",1,"#147aff"]],1,[0,0],null,[0,0],[0,0],0,0,0,[0.5,0.8],1,0.01,0.5,2,0.4,10000,[0,0],2,[0,0],[0,0,50,0],0,0,"square_line2,square_line1,square1",8,""],
	"_auto:0:chant_b4/h":[4,[[0,0,0.3,0.7,0.85,0.7,1,0]],[[0,0,0.2,1.5,0.8,3,1,0],1],[[0,1,1,1],0.8],[[0,"#020de6",1,"#b7f48e"]],0,[0,0],null,[0,0],[240,240],0,0,0,[0.5,0.5],1,0.05,1,1,0.2,10000,[0,0],0,[0,0],null,0,0,"hexagon_line1",8,""],
	"_auto:0:chant_b5/h":[4,[[0,0,0.5,1,1,0]],[[0,0.4,1,0],0.5],[[0,900,0.15,60,1,50],0.4],[[0,"#ab0000",1,"#6f7be6"]],0,[0,-50],null,[0,360],[0,120],0,0,0,[0.5,1],2,0.01,1,3,0.1,10000,[0,0],0,[0,0],null,0,0,"hexagon_line3,hexagon1",8,""],
	"_auto:1:chant_b5/h":[4,[[0,0.5,0.25,0.5,0.6,0.25,0.7,0.2,1,0]],[[0,0,0.25,1.5,0.7,2.5,1,0],1],[[0,1,1,1],0.8],[[0,"#ff0000",1,"#ffafaf"]],0,[0,0],null,[0,0],[200,200],0,0,0,[0.4,0.4],2,0.02,1,1,0.15,10000,[0,0],0,[0,0],null,0,0,"hexagon_line1",8,""],

	


	/* メイン
	===================================*/
	//システム用
	click:[[[0,1,0.85,0.5,1,0],0,0],[[0,1.5,0.5,1,1,0],0.5,0,0],[[0,200,1,200],0.5,0,0],[[0,"#0031ff",0.25,"#eaff00",0.5,"#00ff04",0.75,"#7b00ff",1,"#ff0000"],0,0],1,[0,300],0,[0,360],[0,0],0,0,[0.4,0.6],1,0.001,1,1,0.01,1000,[0,0],0,[0,0],null,null,0,0,"particle1",12,"click:マウスクリック/タップ用1"],
    click2:[[[0,0.2,1,0],0,0],[[0,0,0.25,0.75,1,1.5],1,0,0],[[0,0,1,0],1,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[0,360],[0,0],0,0,[0.35,0.35],null,0.001,1,1,0.0011,10000,[0,0],0,[0,0],null,null,0,0,"circle",12,"click:マウスクリック/タップ用2"],
    drag:[[[0,1,1,1],0,0],[[0,1,0.85,0.5,1,0],0.999,0,0],[[0,0,1,0],1,0,0],[[0,"#96abff",1,"#172eff"],0,0],0,[0,0],0,[0,360],[0,0],0,0,[0.3,0.3],1,0.0005,1,0,0.0011,10000,[0,0],0,[0,0],null,null,0,0,"particle2",0,"drag:マウスドラッグ用"],

	//水中マップ
	bubble_w:[[[0,0,0.2,0.6,0.95,0.6,1,0],0,0],[[0,0,0.2,0.3,0.95,0.7,1,0.8],0.4,0,0],[[0,1,0.2,50,1,50],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[1,3],null,0.2,1,0,-1,10000,[0,0],1,[0,0],[-408,-312,816,624],null,0,0,"bubble1",6,
		"天候:水中の泡"],
	bubble_cp:[[[0,0,0.2,0.6,0.9,0.6,1,0],0,0],[[0,0,0.2,0.2,0.9,0.2,1,0.3],0.1,0,0],[[0,1,0.2,100,1,100],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[1,3],null,0.05,1,0,1,10000,[0,0],1,[0,0],[-24,0,48,0],null,0,0,"bubble1",0,
		"キャラ_play:穴から吹き出す泡"],
	bubble_c:[[[0,0,0.5,0.7,1,0],0,0],[[0,1,1,1.3],1,0,0],[[0,1,1,1],1,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[1,1],null,0.5,1,0,-1,10000,[0,0],2,[0,0],null,[0,-26,3,0],0,0,"bubble1",3,
		"キャラ:キャラを包む泡。attach推奨"],
	light_pillar_w:[[[0,0.5,1,0.51],0,0],[[0,4,1,4.01],2,0,0],[[0,1,1,1],1,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[90,90],[0,0],0,0,[99999,99999],1,0.001,1,1,-1,12,[0,0],1,[0,0],[-616,-500,1232,300],null,0,0,"line_oval1",6,
		"天候:上部からの光柱。横スク用マップ用"],
	fog_w:[[[0,0,0.05,0.05,0.9,0.05,1,0],0,0],[[0,4,0.5,4,1,4],0.3,0,0],[[0,70,1,70],0.3,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],1,[0,0],0,[0,0],[0,0],0,0,[30,30],1,0.3,1,0,-1,10000,[0,0],1,[0,0],[-508,-312,0,624],null,0,0,"cloud3,cloud2,cloud1",6,
		"天候:薄いフォグ"],
	fish_w:[[[0,0,0.1,0.4,0.9,0.4,1,0],0,0],[[0,1.01,1,1],0.3,0,0],[[0,130,0.2,180,0.4,60,0.6,120,0.8,180,1,60],0.5,0,0],[[0,"#000000",1,"#000000"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[10,10],2,1,1,0,-1,10000,[1,0.01],1,[0,0],[-500,-312,50,624],null,0,0,"fish1",6,
		"天候:水中の影"],
	mahoujin_c:[[[0,0,0.1,1,0.2,0,0.3,1,0.4,0,0.5,1,0.6,0,0.7,0,0.8,1,0.9,0,1,0],0,0],[[0,0,0.2,0.2,0.5,0.2,1,0],0.5,0,0],[[0,1,1,1],1,0,0],[[0,"#56ff89",0.5,"#52fffc",1,"#b3ff25"],0,0],1,[0,-100],0,[0,0],[0,0],0,0,[1,1],1,0.03,1,0,-1,10000,[0,0],3,[0,0],null,[0,-18,40,0],0,0,"particle2",0,
		"キャラ:魔法陣上のキラキラ光粒"],
	mahoujin_c2:[[[0,0,0.5,1,1,0],0,0],[[0,0,0.2,1,0.5,1,1,0],0.8,0,0],[[0,1,1,1],1,0,0],[[0,"#ff3287",1,"#566dff"],0,0],0,[0,-150],0,[0,0],[0,0],0,0,[1,1],1,0.04,1,0,-1,10000,[0,0],3,[0,0],null,[0,-60,64,0],0,0,"line2,line_oval2",0,
		"キャラ:魔法陣上の光線演出"],
	dish_steam_c:[4,[[0,0,0.5,0.15,1,0]],[[0,0.8,1,0.5],0.5],[[0,10,1,30],1],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[2,3],1,0.2,0.8,1,-1,10000,[0,0],0,[0,-20],null,0,0,"cloud2",0,
		"料理の湯気"],
	light_orange_c:[4,[[0,0,0.5,0.4,1,0]],[[0,0.5,1,0.5],0.5],[[0,0,1,0],1],[[0,"#ff8c5b",1,"#ff8c5b"]],0,[0,0],null,[0,360],[0,0],0,0,0,[1,1],1,0.3,1,1,-1,10000,[0,0],0,[0,-12],null,0,0,"flare",0,
		"照明の光(オレンジ)"],
	jump_fuss_cp:[4,[[0,0,0.1,0.8,0.5,0.5,1,0]],[[0,0.3,0.9,0.3,1,0.1],0.5],[[0,150,0.2,50,1,0],0.5],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[-160,-20],[0,0],0,0,0,[0.3,0.6],0,0.01,1,2,0.1,60,[0,0],0,[0,0],null,0,0,"cartoon_fuss2",0,
		"ジャンプ時のアニメ調の煙"],

	//火山マップ
	magma_r:[[[0,1,1,0],0,0],[[0,0,0.2,1.5,0.8,1.5,1,0],0.5,0,0],[[0,0,1,0],1,0,0],[[0,"#ff3007",0.5,"#ff5959",1,"#ffffff"],0,0],0,[0,0],0,[0,360],[0,0],0,0,[1,1],1,0.1,1,0,-1,1000,[0,0],0,[0,0],null,null,0,0,"particle4",7,
		"リージョン:マグマの床"],
	sparks_w:[[[0,1,0.5,1,1,0],0,0],[[0,0,0.1,0.15,0.5,0.15,1,0],0.5,0,0],[[0,120,1,50],0.3,0,0],[[0,"#ff2c00",1,"#ffbfb1"],0,0],0,[0,0],0,[-90,-90],[0,0],0,2,[0.8,1.5],1,0.1,1,0,-1,10000,[3,0.1],1,[0,0],[-408,-224,816,524],null,0,0,"flame1",6,
		"天候:薄っすらと舞い上がる火の粉"],
	sparks_c:[[[0,1,0.5,1,1,0],0,0],[[0,0,0.5,0.3,1,0],0.5,0,0],[[0,1,1,1],0.5,0,0],[[0,"#ff5500",1,"#ff8d54"],0,0],0,[0,-100],0,[-90,-90],[0,0],0,2,[1,1],1,0.1,1,0,-1,10000,[0,0],1,[0,0],[-18,-36,36,24],null,0,0,"flame1",0,
		"キャラ:焚き火の火の粉"],
	smoke_c:[[[0,0,0.5,0.8,1,0],0,0],[[0,1,1,0.8],1,0,0],[[0,1,1,100],0.5,0,0],[[0,"#7b7b7b",0.5,"#525252",1,"#525252"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[1.5,2],0,0.3,1,0,-1,10000,[0,0],0,[0,-64],null,null,0,0,"smoke1,smoke2",0,
		"キャラ:焚き火の煙"],
	fire_c:[[[0,0,0.2,1,0.5,1,1,0],0,0],[[0,0,0.2,1,0.5,1,1,0],0,0,0],[[0,1,0.2,250,1,150],0.5,0,0],[[0,"#ff2e2e",1,"#ffb92e"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[1,1],1,0.005,0.5,1,-1,10000,[0,0],1,[0,0],[-48,12,96,0],null,0,0,"smog2,smoke2,smoke1",0,
		"キャラ:大きな炎"],
	smoke_c2:[[[0,0,0.5,0.5,1,0],0,0],[[0,0,0.5,3,1,1],0.5,0,0],[[0,1,0.2,250,1,150],0.5,0,0],[[0,"#ffffff",1,"#7b7b7b"],0,0],1,[0,0],0,[-90,-90],[0,0],0,0,[1,1],4,0.01,0.5,1,-1,10000,[0,0],2,[0,0],null,[0,-36,80,0],0,0,"smoke2,smoke1,smog1",0,
		"キャラ:fire用の大きな煙"],
	explode_cp_1:[[[0,0,0.2,0.5,1,0.5],0,0],[[0,5,0.4,1,1,0],1,0,0],[[0,1,0.3,1,1,1],1,0,0],[[0,"#ffffff",1,"#ff7749"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[0.24,0.24],null,0.01,1,1,0.011,1,[0,0],0,[0,-24],null,null,0,0,"circle2",0,
		"キャラ:爆発前のサークル収束"],
	explode_cp_2:[[[0,1,0.2,1,0.7,1,1,0],0,0],[[0,1,0.15,6,0.3,1,0.45,8,0.6,1,0.8,10,1,12],0.1,0,0],[[0,500,0.3,100,1,0],0.3,0,0],[[0,"#ff7f7f",1,"#ff7f30"],0,0],0,[0,0],0,[0,360],[0,0],0,0,[0.3,1],1,0.001,1,1,0.03,10000,[0,0],0,[0,-24],null,null,0,0,"smog1",0,
		"キャラ:爆発の炎"],

	explode_cp_3:[[[0,0.6,0.2,0.4,1,0],0,0],[[0,0,0.18,4,1,4.5],1,0,0],[[0,1,0.3,1,1,1],1,0,0],[[0,"#ffffff",1,"#ff7749"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[1,1],null,0.04,1,0.05,1,1,[0,0],0,[0,-24],null,null,0,0,"circle2",0,
		"キャラ:爆発時のサークル発散"],
	explode_cp_4:[[[0,0,0.1,0.8,0.3,0.8,0.4,0,0.5,0.8,0.7,0.8,0.8,0,0.9,0.8,1,0],0,0],[[0,0.6,1,0.3],0.3,0,0],[[0,1,1,1],1,0,0],[[0,"#ff7824",0.5,"#ffffff",1,"#ff1515"],0,0],1,[0,0],0,[0,360],[0,0],0,0,[0.3,0.7],1,0.005,0.8,1,0.25,100,[0,0],3,[0,0],null,[0,-24,130,0],0,0,"circle2",0,
		"キャラ:爆発後のチカチカする円"],

	//花火マップ
	fireworks_c:[[[0,0,0.11,1,0.5,1,1,0],0,0],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8,0,0],[[0,1200,0.1,200,0.2,50,1,1],0.1,0,0],[[0,"#ff8d8d",0.4,"#ffffff",1,"#ffa83e"],0,0],1,[0,0],0,[0,360],[50,-50],0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,0],null,null,0,0,"flare",0,
		"キャラ:打ち上げ花火"],
	fireworks_dragon_c:[[[0,1,0.8,1,1,0],0,0],[[0,0.2,1,0],0.8,0,0],[[0,800,0.3,200,1,0],0.5,0,0],[[0,"#ff8d8d",0.4,"#ffffff",1,"#ffa83e"],0,0],1,[0,100],0,[-75,-105],[50,-50],0,0,[0.7,1],1,0.01,1,1,-1,10000,[0,0],0,[0,0],null,null,0,0,"smog2",0,
		"キャラ:噴出タイプの花火"],
	// fireworks_niagala_c:[[[0,1,0.8,1,1,0],0,0],[[0,0.3,0.8,0.15,1,0],0.8,0,0],[[0,10,1,350],1,0,0],[[0,"#ff8d8d",0.4,"#ffffff",1,"#ffa83e"],0,0],1,[0,0],0,[90,90],[50,-50],0,0,[0.7,1],1,0.003,1,1,-1,10000,[0,0],1,[0,0],[-120,-45,230,0],null,0,0,"smog2",0,
	// 	"キャラ:滝タイプの花火"],
	light_leak_s:[[[0,0,0.5,0.1,1,0],0,0],[[0,20,1,20],0.2,0,0],[[0,15,1,14],0.5,0,0],[[0,"#00ff0c",0.5,"#fff500",1,"#ff5f5f"],0,0],1,[0,0],0,[0,0],[0,0],0,0,[3,5],1,0.15,0.5,0,-1,10000,[2,0.02],1,[0,0],[-408,-312,816,624],null,0,0,"particle4",5,
		"スクリーン:淡いライトリーク"],

	//雪マップ
	blizard_w:[[[0,1,0.8,1,1,0],0,0],[[0,0.41,1,0.4],0.3,0,0],[[0,2000,1,2000],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[15,30],[0,0],0,0,[0.13,0.13],1,0.001,1,5,-1,10000,[0,0],1,[0,0],[-408,-412,916,624],null,0,0,"snow_particle2,snow_particle1",6,
		"天候:吹雪"],
	snow_w:[[[0,0,0.2,1,1,0],0,0],[[0,0.2,1,0.2],0.5,0,0],[[0,100,1,100],1,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[90,90],[-100,100],0,0,[20,30],1,0.1,1,0,-1,10000,[1,0.01],1,[0,0],[-408,-440,916,40],null,0,0,"snow_particle1",6,
		"天候:うっすらと降る雪"],
	snow_w2:[[[0,0,0.3,0.6,1,0],0,0],[[0,0.31,1,0.3],0.1,0,0],[[0,50,1,50],0.75,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[90,90],[-50,50],0,0,[5,10],1,0.1,1,0,-1,10000,[2,0.01],1,[0,0],[-408,-412,916,624],null,0,0,"snow2,snow5g",6,
		"天候:雪の結晶"],
	diamonddust_w:[[[0,0,0.5,1,1,0],0,0],[[0,0.8,1,0.81],0.2,0,0],[[0,15,1,14],0.5,0,0],[[0,"#b2f7ff",1,"#d6ffe1"],0,0],1,[0,0],0,[0,360],[-120,120],0,0,[1.2,1.8],1,0.1,1,0,-1,10000,[2,0.02],1,[0,0],[-408,-312,816,624],null,0,0,"shine_thin3",6,
		"天候:キラキラ漂うダイヤモンドダスト"],
	diamonddust_w2:[[[0,0,0.5,1,1,0],0,0],[[0,0.6,1,0.61],0.3,0,0],[[0,15,1,14],0.5,0,0],[[0,"#92ff7b",1,"#89d7ff"],0,0],1,[0,0],0,[0,360],[-120,120],0,0,[1,1.5],1,0.03,1,0,-1,10000,[2,0.02],1,[0,0],[-408,-312,816,624],null,0,0,"shine_thin3",6,
		"天候:キラキラ漂うダイヤモンドダスト2"],
	illumination_w:[[[0,0,0.5,1,1,0],0,0],[[0,0.8,1,0.81],0.2,0,0],[[0,15,1,14],0.5,0,0],[[0,"#e0ff14",0.25,"#3c00ff",0.5,"#ff4d00",0.75,"#00bbff",1,"#00ff45"],0,0],1,[0,0],0,[0,360],[-120,120],0,0,[1.2,1.8],1,0.03,1,0,-1,10000,[2,0.02],1,[0,0],[-408,-312,816,624],null,0,0,"shine_thin3,particle4,flare2",6,
		"天候:カラフルなイルミネーション"],
	light_leak_s2:[[[0,0,0.5,0.3,1,0],0,0],[[0,1,1,1],0.3,0,0],[[0,15,1,14],0.5,0,0],[[0,"#92ff7b",1,"#89d7ff"],0,0],1,[0,0],0,[0,360],[-120,120],0,0,[2,4],1,0.4,1,0,-1,10000,[2,0.02],1,[0,0],[-408,-312,816,624],null,0,0,"flare",5,
		"スクリーン:青&緑のライトリーク"],
	kira_blue_c:[[[0,1,0.5,1,1,0],0,0],[[0,1,0.5,1,1,0],0.2,0,0],[[0,60,1,0],0.2,0,0],[[0,"#e0e6ff",1,"#a3ffc8"],0,0],0,[0,0],0,[-90,-90],[-90,90],0,0,[0.5,1],1,0.5,1,3,-1,10000,[0,0],1,[0,0],[-24,0,48,-48],null,0,0,"shine_thin3",0,
		"キャラ:青いキラキラエフェクト"],

	//闇マップ
	dark_hole_r:[[[0,1,0.1,1,0.15,0,0.2,1,0.4,1,0.45,0,0.5,1,0.8,1,0.84,0,0.88,1,0.92,0,0.96,1,1,0],0,0],[[0,0.35,0.5,0.25,1,0],0.2,0,0],[[0,200,1,100],0.3,0,0],[[0,"#1a6dad",1,"#a3ffc8"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[0.5,1.5],0,0.3,1,0,-1,10000,[3,0.01],0,[0,0],null,null,0,0,"shine2",7,
		"リージョン:穴からキラキラ吹き上げる光"],
	dark_hole_r_2:[[[0,1,0.5,1,1,0],0,0],[[0,1,0.5,1,1,0],0.3,0,0],[[0,200,1,100],1,0,0],[[0,"#073f74",1,"#78f4e1"],0,0],0,[0,0],0,[-90,-90],[0,0],0,0,[0.8,0.8],1,0.1,1,0,-1,10000,[0,0],0,[0,0],null,null,0,0,"line_oval3",7,
		"リージョン:穴から吹き上げる線形の光"],
	dark_hole_r_3:[[[0,0,0.5,0.3,1,0],0,0],[[0,0,0.5,2,1,3],0.5,0,0],[[0,1,1,1],1,0,0],[[0,"#00acff",1,"#b70eff"],0,0],0,[0,0],0,[0,0],[0,0],0,2,[0.5,1.5],3,0.5,1,1,-1,10000,[0,0],0,[0,0],null,null,0,0,"smoke2",7,
		"リージョン:穴の中のもやもや"],
	poison_r:[3,[[0,0,0.5,0.5,1,0]],[[0,0,0.8,0.4,1,0.5],0.25],[[0,1,1,1],1],[[0,"#57005f",1,"#69005d"]],0,[0,0],null,[-90,-90],[0,0],0,0,[0.6,1.2],2,0.5,0.5,1,-1,10000,[0,0],0,[0,0],null,0,0,"circle2",7,
		"リージョン:毒の沼"],
	darkness_s:[3,[[0,0,0.5,0.8,1,0]],[[0,8,0.5,8,1,8],0.5],[[0,1,1,1],1],[[0,"#000000",1,"#000000"]],0,[0,0],null,[0,360],[0,0],0,0,[2,2],2,0.04,1,1,-1,10000,[0,0],3,[0,0],[0,0,450,400],0,0,"smoke2,cloud2s",5,
		"スクリーン:暗闇の視界制限"],
	monster_cp:[3,[[0,0,0.1,1,0.9,1,1,0]],[[0,5,1,0.3],0.3],[[0,-220,1,-220],1],[[0,"#3714ff",1,"#0022ff"]],0,[0,0],null,[0,0],[0,0],0,0,[0.3,0.8],1,0.01,1,2,0.4,10000,[0,0],3,[0,0],[0,-24,100,80],0,0,"particle4",0,
		"キャラ:パーティクルが収束"],
	monster_cp2:[3,[[0,0,0.3,1,1,0]],[[0,2.5,0.3,1,1,0.5],0.8],[[0,1200,0.2,200,1,0],0.8],[[0,"#7b00ff",1,"#c99bff"]],1,[0,0],null,[0,360],[0,0],0,0,[0.4,0.8],1,0.01,1,3,0.1,10000,[0,0],0,[0,-24],null,0,0,"line_oval2",0,
		"キャラ:集中線が発散。"],
	monster_c:[3,[[0,0,0.2,1,0.8,1,1,0]],[[0,0.75,1,0],0.5],[[0,120,1,121],0.5],[[0,"#da9fff",1,"#ec6dff"]],0,[0,-30],null,[30,-210],[0,0],0,0,[1,1.5],1,0.1,1,1,-1,10000,[0,0],0,[0,-12],null,0,0,"particle2",0,
		"キャラ:中央から光球が発生して上に"],
	aura_bp:[3,[[0,1,0.7,1,1,0]],[[0,2,0.15,0.8,0.7,0.8,1,0],0.5],[[0,1500,0.15,50,0.7,50,1,100],0.2],[[0,"#8dfffd",1,"#ffffff"]],0,[0,0],null,[0,360],[0,0],0,0,[1,1],1,0.0015,1,1,0.1,10000,[0,0],0,[0,0],null,0,0,"snow_particle2g,line_oval3",8,
		"戦闘キャラ:青白い光の粒＆集中線発散"],
	aura_bp2:[3,[[0,1,0.2,1,1,0]],[[0,0,0.18,4,1,4.5],1],[[0,1,0.3,1,1,1],1],[[0,"#ffffff",1,"#49d5ff"]],0,[0,0],null,[0,0],[0,0],0,0,[1,1],1,0.04,1,0.05,1,1,[0,0],0,[0,0],null,0,0,"circle3g",8,
		"戦闘キャラ:青白いサークル拡大"],

	//天界,
	light_pillar_r:[3,[[0,0,0.3,0.5,0.7,0.5,1,0]],[[0,3,1,3],0.4],[[0,1,1,0],1],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[90,90],[0,0],0,0,[5,5],1,1,0.02,1,-1,10000,[0,0],0,[0,0],null,0,0,"line_oval3",7,
		"リージョン:空エリアの光の柱"],
	light_floor_r:[3,[[0,0,0.5,1,0.55,0,0.6,1,0.65,0,0.7,1,0.75,0,0.8,1,0.85,0,0.9,1,0.95,0,1,0]],[[0,0,0.5,0.2,1,0],0.5],[[0,20,1,20],0.5],[[0,"#ffea00",1,"#ffea00"]],0,[0,-50],null,[-90,-90],[-120,120],0,0,[1,2],1,1,1,1,-1,10000,[0,0],2,[0,0],[0,-12,32,0],0,0,"shine3",7,
		"リージョン:キラキラ点滅する小さな光粒"],
	particle_w:[3,[[0,0,0.5,1,1,0]],[[0,0.6,1,0.6],0.2],[[0,40,1,40],0.2],[[0,"#ffc2c2",1,"#fffdb9"]],1,[0,-10],null,[-90,-90],[0,0],0,0,[1.5,4],1,0.1,1,1,-1,10000,[5,0.2],1,[0,0],[-408,-312,816,624],0,0,"particle8,particle5",6,
		"天候:ゆらゆら上昇する光粒"],
	orb_c:[3,[[0,0.5,1,0]],[[0,0,0.1,2,1,3.5],0.8],[[0,1,1,1],1],[[0,"#00d0ff",1,"#a6eeff"]],0,[0,0],null,[0,360],[0,0],0,0,[0.6,0.6],1,0.1,1,1,-1,10000,[0,0],0,[0,-24],null,0,0,"ripple1g",0,
		"キャラ:オーブの波動"],
	orb_cp:[3,[[0,1,1,0]],[[0,0,0.1,1,1,0],0.8],[[0,800,0.1,200,1,1],0.5],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[0,360],[0,0],0,0,[0.5,0.7],1,0.005,1,1,0.1,10000,[0,0],0,[0,-26],null,0,0,"shine3",0,
		"キャラ_play:青白いキラキラ光粒が発散"],
	light_float_cp:[3,[[0,1,1,0]],[[0,3,1,0],0.2],[[0,500,1,1],0.5],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[-90,-90],[0,0],0,0,[0.4,0.8],1,0.003,1,1,0.15,10000,[0,0],1,[0,0],[-18,-150,36,0],0,0,"line_oval3",0,
		"キャラ_play:光柱が頭上に向かって消える"],
	statue_orb_c:[3,[[0,0,0.5,1,1,0]],[[0,0.5,1,0],0.5],[[0,1,1,80],0.5],[[0,"#ffff00",1,"#460000"]],0,[0,0],null,[-180,0],[0,0],0,0,[1,1],1,0.1,1,1,-1,10000,[0,0],0,[0,-22],null,0,0,"cloud2",0,
		"キャラ:石像のオーブから出る光粒"],
	magic_circle_c:[3,[[0,0,0.5,1,1,0]],[[0,0.25,1,0],0.5],[[0,50,1,50],0.5],[[0,"#ff0707",1,"#ffcdcd"]],0,[0,-30],null,[-90,-90],[-120,120],0,0,[0.5,1.5],2,0.05,1,1,-1,10000,[0,0],2,[0,0],[0,-24,24,0],0,0,"hexagon_line3,hexagon1",0,
		"キャラ:魔法陣の幾何学エフェクト"],
	warp_red_c:[3,[[0,0,0.5,1,1,0]],[[0,0,0.5,1.5,1,0],0.5],[[0,10,1,150],1],[[0,"#ff3030",1,"#ff1d1d"]],0,[0,0],null,[0,360],[0,0],0,0,[0.5,1],2,0.03,1,1,-1,10000,[0,0],0,[0,-24],null,0,0,"line_oval3,line_oval2",0,
		"キャラ:赤魔法陣ワープの集中線"],
	warp_red_cp:[3,[[0,0,0.5,1,1,0]],[[0,0.5,0.5,0.2,1,0],0.5],[[0,1000,0.2,200,1,0],0.5],[[0,"#9100ff",1,"#ff0000"]],1,[0,0],null,[-90,-90],[-360,360],0,0,[0.5,1],2,0.01,1,1,0.3,10000,[0,0],2,[0,-24],[0,12,36,0],0,0,"square_line1",0,
		"キャラ:ワープ直後の幾何学エフェクト"],

	fire_pillar_c:[4,[[0,0,0.5,1,1,0]],[[0,0,0.2,0.6,1,0],0.7],[[0,150,1,50],1],[[0,"#ff824d",1,"#ff7d46"]],0,[0,0],null,[-90,-90],[0,0],0,2,0,[1,1.5],1,0.05,1,2,-1,10000,[0,0],4,[-12,18],[0,0,0,1,0,24,0],0,0,"flame1g",0,
		"キャラ:行き止まり用の炎の柱"],


	//歩行
	fuss_startdash:[[[0,0,0.1,0.8,0.5,0.5,1,0],0,0],[[0,0,0.2,0.5,0.9,0.5,1,0.12],0.5,0,0],[[0,500,0.2,50,1,0],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-60,-120],[-100,100],0,0,[0.6,1.2],4,0.01,1,3,0.05,60,[0,0],0,[0,0],null,null,0,0,"cartoon_fuss1",2,
		"スタートダッシュ:アニメ調の煙"],
	fuss_walk:[[[0,0,0.1,0.8,0.5,0.5,1,0],0,0],[[0,0,0.3,0.5,0.9,0.5,1,0.12],0.5,0,0],[[0,150,1,0],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-60,-120],[0,0],0,0,[0.5,1],4,0.1,1,3,-1,60,[0,0],0,[0,0],null,null,0,0,"cartoon_fuss2",1,
		"歩行:アニメ調の煙"],
	dust_walk:[[[0,0,0.1,0.3,1,0],0,0],[[0,0,0.05,1.5,1,2],0.5,0,0],[[0,100,1,0],0.5,0,0],[[0,"#a4724c",1,"#ffffff"],0,0],0,[0,0],0,[-150,-30],[0,0],0,0,[0.7,1.2],0,0.08,0.7,1,-1,60,[0,0],2,[0,0],null,[0,-6,12,0],0,0,"smog1",1,
		"歩行:土煙"],
	grass_walk:[[[0,0,0.1,0.8,0.5,0.5,1,0],0,0],[[0,0,0.3,0.2,0.9,0.2,1,0.12],0.5,0,0],[[0,200,1,200],0.8,0,0],[[0,"#005b11",1,"#005b11"],0,0],0,[0,300],0,[-30,-150],[-100,200],1,2,[0.4,0.6],0,0.25,1,4,-1,60,[0,0],0,[0,0],null,null,0,0,"flame1",1,
		"歩行:飛び散る草"],
//PRAGMA: flowerWalk
	flower_walk:[[[0,0,0.005,1,0.5,1,1,0],0,0],[[0,0,0.005,1,0.5,1,1,1],0.5,0,0],[[0,0,1,0],0,0,0],[[0,"#ffffff",0.5,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[0.5,1.5],0,0.025,1,1,-1,1000,[0,0],2,[0,0],null,[0,0,24,0],0,0,"tile:Outside_B:73,tile:Outside_B:74,tile:Outside_B:75",1,
		"歩行:歩いた跡に花(タイル使用)"],
//PRAGMA_END: flowerWalk
	splash_walk:[[[0,0,0.1,0.8,0.7,0.5,1,0],0,0],[[0,0,0.3,0.25,0.9,0.25,1,0],0.3,0,0],[[0,350,1,0],0.5,0,0],[[0,"#0047ff",1,"#ffffff"],0,0],0,[0,100],0,[-30,-150],[0,0],0,0,[0.4,0.5],1,0.25,1,4,-1,60,[0,0],0,[0,0],null,null,0,0,"snow_particle2",1,
		"歩行:水しぶき"],
	ripple_walk:[[[0,0,0.1,0.5,1,0],0,0],[[0,0,0.1,1,1,2],0.4,0,0],[[0,0,1,0],0.5,0,0],[[0,"#c2cdff",1,"#d4e6ff"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[0.5,1],1,0.08,0.7,1,-1,60,[0,0],2,[0,0],null,[0,-4,6,0],0,0,"ripple2",1,
		"歩行:水の波紋"],
	fuss_c:[[[0,0,0.1,0.8,0.5,0.5,1,0],0,0],[[0,0,0.3,1,1,2],0.1,0,0],[[0,150,1,0],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-60,-120],[0,0],0,0,[0.5,1],4,0.03,1,3,0.5,30,[0,0],1,[0,0],[-36,0,72,0],null,0,0,"cartoon_fuss2",0,
		"キャラ:乱闘中っぽいアニメ調の煙"],

	//天候
	flash_s:[[[0,0,0.2,0.25,1,0],0,0],[[0,6,1,6],0.9,0,0],[[0,1,1,1],1,0,0],[[0,"#ffe8ad",1,"#ffe8ad"],0,0],1,[0,0],0,[0,360],[0,0],0,0,[1,1],1,0.2,0.25,0,-1,10000,[0,0],0,[-500,-550],null,null,0,0,"flare",5,
		"スクリーン:太陽光のフラッシュ"],
	flare_s:[[[0,0,0.2,1,0.8,1,1,0],0,0],[[0,6,1,6],0.9,0,0],[[0,1,1,1],1,0,0],[[0,"#ffb050",1,"#ffffff"],0,0],1,[0,0],0,[0,360],[0,0],0,0,[1,1],1,0.2,1,0,-1,10000,[0,0],0,[-500,-550],null,null,0,0,"flare2",5,
		"スクリーン:太陽光のフレア"],
	fog_w2:[[[0,0,0.05,0.1,0.9,0.1,1,0],0,0],[[0,4,0.5,4,1,4],0.3,0,0],[[0,70,1,70],0.3,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],1,[0,0],0,[0,0],[0,0],0,0,[30,30],1,0.3,1,0,-1,10000,[0,0],1,[0,0],[-616,-312,0,624],null,0,0,"cloud3,cloud2,cloud1",5,
		"天候:濃いめのモヤ"],
	fog_shadow_w:[[[0,0,0.05,0.05,0.9,0.05,1,0],0,0],[[0,5,0.5,5,1,5],0.25,0,0],[[0,70,1,70],0.3,0,0],[[0,"#000000",1,"#000000"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[30,30],2,0.3,1,0,-1,10000,[0,0],1,[0,0],[-616,-312,0,624],null,0,0,"cloud3,cloud2,cloud1",5,
		"天候:モヤの影"],
	cloud_w:[[[0,0,0.05,0.75,0.9,0.75,1,0],0,0],[[0,10,0.5,10,1,10],0.3,0,0],[[0,70,1,70],0.3,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[60,60],0,3,0.5,0,-1,10000,[0,0],1,[0,0],[-616,-312,0,624],null,0,0,"cloud3,cloud2,cloud1",5,
		"天候:雲"],
	cloud_shadow_w:[[[0,0,0.05,0.2,0.9,0.2,1,0],0,0],[[0,7,0.5,7,1,7],0.3,0,0],[[0,25,1,25],0.3,0,0],[[0,"#000000",1,"#000000"],0,0],0,[0,0],0,[0,0],[0,0],0,0,[70,70],0,3,0.5,0,-1,10000,[0,0],1,[0,0],[-616,-312,0,624],null,0,0,"cloud3,cloud2,cloud1",5,
		"天候:雲の影"],
	rain_w:[[[0,0,0.2,0.6,1,0],0,0],[[0,0.3,1,0.3],0.5,0,0],[[0,300,1,300],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[90,90],[0,0],0,0,[0.3,0.5],1,0.008,1,0,-1,10000,[0,0],1,[0,0],[-408,-412,916,624],null,0,0,"line_rain2",6,
		"天候:しとしと雨"],
	rain_w2:[[[0,0,0.2,0.8,0.8,0.5,1,0],0,0],[[0,0.84,1,0.85],0.5,0,0],[[0,800,1,800],0.75,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[112.5,112.5],[0,0],0,0,[0.3,0.4],0,0.008,1,0,-1,10000,[0,0],1,[0,0],[-408,-412,916,624],null,0,0,"line_rain1",6,
		"天候:強めの雨"],
	rain_w3:[[[0,0,0.2,0.8,0.8,0.5,1,0],0,0],[[0,1.1,1,1],2.5,0,0],[[0,1500,1,1500],0.75,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[112.5,112.5],[0,0],0,0,[0.15,0.25],1,0.003,1,0,-1,10000,[0,0],1,[0,0],[-408,-412,916,624],null,0,0,"line2",6,
		"天候:本降りの雨"],
	ripple_r:[[[0,0.5,0.5,0.5,1,0],0,0],[[0,0,0.5,0.6,1,1],0.5,0,0],[[0,0,1,0],1,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[0,0],[0,0],0,2,[0.6,1],1,1,0.5,0,-1,10000,[0,0],1,[0,0],[-408,-312,816,624],null,0,0,"ripple2",7,
		"リージョン:水たまりの波紋"],
	rain_fog_w:[[[0,0,0.5,0.2,1,0],0,0],[[0,0.5,1,1],1.5,0,0],[[0,50,0.2,20,1,15],0.5,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[-90,-90],[0,0],0,2,[1,2],1,0.08,0.5,0,-1,10000,[0,0],1,[0,0],[-408,-312,816,624],null,0,0,"smoke2",6,
		"天候:雨天時のモヤ"],
	thunder_w:[[[0,1,0.2,1,1,0],0,0],[[0,11,0.2,11,1,11],0.2,0,0],[[0,1,1,1],0.5,0,0],[[0,"#ffff20",0.05,"#3300ff",1,"#c800ff"],0,0],0,[0,0],0,[85,95],[0,0],0,2,[0.5,1],1,0.06,0.2,0,-1,10000,[0,0.02],1,[0,0],[-408,-412,816,200],null,0,0,"thunder1,thunder2",6,
		"天候:ピカッと一瞬光る稲妻"],
	thunder_w2:[[[0,1,0.2,1,1,0],0,0],[[0,11,0.2,11,1,11],0.2,0,0],[[0,1,1,1],0.5,0,0],[[0,"#ffff20",1,"#ffff20"],0,0],0,[0,0],0,[85,95],[0,0],0,2,[0.5,1],1,0.06,0.2,0,-1,10000,[0,0.02],1,[0,0],[-408,-412,816,200],null,0,0,"thunder1,thunder2",6,
		"天候:黄色の稲妻"],
	petal_w:[3,[[0,0,0.2,0.8,0.8,0.8,1,0]],[[0,0.25,1,0.25],0.75],[[0,200,0.5,100,1,200],0.5],[[0,"#fabfff",1,"#fce1ff"]],1,[0,0],null,[0,0],[-180,180],-1,0,[2,4],4,0.05,1,1,-1,10000,[5,0.2],1,[0,0],[-408,-312,816,624],0,0,"petal1",6,
		"天候:桜の花びら"],

	//戦闘
	aura_bp:[3,[[0,1,0.7,1,1,0]],[[0,2,0.15,0.8,0.7,0.8,1,0],0.5],[[0,1500,0.15,50,0.7,50,1,100],0.2],[[0,"#8dfffd",1,"#ffffff"]],0,[0,0],null,[0,360],[0,0],0,0,[1,1],1,0.0015,1,1,0.1,10000,[0,0],0,[0,0],null,0,0,"snow_particle2g,line_oval3",0,
		"キャラ_play:青白い粒子と集中線拡散"],
	aura_bp2:[3,[[0,1,0.2,1,1,0]],[[0,0,0.18,4,1,4.5],1],[[0,1,0.3,1,1,1],1],[[0,"#ffffff",1,"#49d5ff"]],0,[0,0],null,[0,0],[0,0],0,0,[1,1],1,0.04,1,0.05,1,1,[0,0],0,[0,0],null,0,0,"circle3g",0,
		"キャラ_play:青白いサークル拡大"],
	aura_static_b:[3,[[0,0,0.5,1,1,0]],[[0,0,1,0.5],0.3],[[0,60,1,10],1],[[0,"#0592ff",1,"#0592ff"]],0,[0,-10],null,[0,360],[-90,90],-1,2,[1,1],1,0.01,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"cloud3",0,
		"キャラ:もやもやのオーラ"],
	charm_bw:[3,[[0,0,0.3,1,1,0]],[[0,0,0.3,0.4,1,0.6],0.5],[[0,100,1,1],0],[[0,"#dd00ff",1,"#ffffff"]],0,[0,0],null,[-120,-60],[-90,90],-1,0,[1.5,2.5],0,0.1,1,1,-1,1000,[0,0],1,[0,0],[-408,-312,816,624],0,0,"heart4g",6,
		"天候:画面全体ハート"],
	black_particle_w:[3,[[0,0,0.5,1,1,0]],[[0,0.6,1,0.6],0.2],[[0,40,1,40],0.2],[[0,"#670088",1,"#670088"]],1,[0,-10],null,[-90,-90],[0,0],0,0,[1.5,4],2,0.1,1,1,-1,10000,[5,0.2],1,[0,0],[-408,-312,816,624],0,0,"particle8,particle5",6,
		"天候:黒いパーティクル"],

	//テスト用
    particle:[[[0,0,0.5,1,1,0],0,0],[[0,0,0.5,1,1,0],0.5,0,0],[[0,300,1,100],1,0,0],[[0,"#ffffff",1,"#ffffff"],0,0],0,[0,0],0,[0,360],[0,0],0,0,[1,1],1,0.01,1,1,-1,10000,[0,0],0,[0,0],null,null,0,0,"particle1",0,"テスト用"],
    light_r:[[[0,1,0.5,1,1,0],0,0],[[0,0,0.5,1,1,0],0.2,0,0],[[0,10,1,100],0.5,0,0],[[0,"#14ff1f",1,"#ffef9d"],0,0],1,[0,0],0,[-90,-90],[0,0],0,0,[1,2],0,0.2,1,1,-1,10000,[0,0],0,[0,0],null,null,0,0,"particle4",7,"region:テスト用1"],

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





//=============================================================================
// ExPreset1
//=============================================================================
$dataTrpParticlePreset.cracker_r = 
	[4,[[0,1,0.5,1,0.9,0.5,1,0]],[[0,0.2,0.8,0.2,1,0],0.8],[[0,6000,0.2,200,1,0],0.6],[[0,"#103bff",0.25,"#ff0000",0.5,"#ffe200",0.75,"#f200ff",1,"#a3ffc8"]],1,[0,30],null,[-148,-132],[360,-360],0,0,0,[0.8,1.5],0,0.0015,1,1,0.1,10000,[20,0.3],0,[408,200],null,0,0,"square1",0,
	"クラッカー：画面右から"];
$dataTrpParticlePreset.cracker_l = 
	[4,[[0,1,0.5,1,0.9,0.5,1,0]],[[0,0.2,0.8,0.2,1,0],0.8],[[0,6000,0.2,200,1,0],0.6],[[0,"#103bff",0.25,"#ff0000",0.5,"#ffe200",0.75,"#f200ff",1,"#a3ffc8"]],1,[0,30],null,[-32,-48],[360,-360],0,0,0,[0.8,1.5],0,0.0015,1,1,0.1,10000,[20,0.3],0,[-408,200],null,0,0,"square1",0,
	"クラッカー：画面左から"];
$dataTrpParticlePreset.wing_l = [4,[[0,0,0.5,1,1,0]],[[0,0,0.5,0.7,1,0],1],[[0,100,1,100],1],[[0,"#c29fff",1,"#ffc38f"]],0,[0,0],null,[0,360],[0,0],0,1,0,[1,1],1,0.1,1,5,-1,10000,[2,0.1],4,[-4,-24],[15,160,0,0,0,0,0],0,0,"flame1",0,
	"光の翼(左)"];
$dataTrpParticlePreset.wing_l2 = [4,[[0,0,0.1,1,1,0]],[[0,0,0.2,0.15,0.5,0.15,1,0],0.5],[[0,800,0.1,200,1,1],0.8],[[0,"#e850ff",1,"#ffff4d"]],1,[0,0],null,[-140,-205],[0,0],0,0,0,[1,1],1,0.2,1,0,-1,10000,[5,0.05],0,[-4,-24],null,0,0,"flare",0,
	"翼から出る光の粒(左)"];
$dataTrpParticlePreset.wing_r = [4,[[0,0,0.5,1,1,0]],[[0,0,0.5,0.7,1,0],1],[[0,100,1,100],1],[[0,"#c29fff",1,"#ffc38f"]],0,[0,0],null,[0,360],[0,0],0,0,0,[1,1],1,0.1,1,5,-1,10000,[2,0.1],4,[4,-24],[15,-40,0,0,0,0,0],0,0,"flame1",0,
	"光の翼(右)"];
$dataTrpParticlePreset.wing_r2 = [4,[[0,0,0.1,1,1,0]],[[0,0,0.2,0.15,0.5,0.15,1,0],0.5],[[0,800,0.1,200,1,1],0.8],[[0,"#e850ff",1,"#ffff4d"]],1,[0,0],null,[-40,25],[0,0],0,0,0,[1,1],1,0.2,1,0,-1,10000,[5,0.05],0,[4,-24],null,0,0,"flare",0,
	"翼から出る光の粒(右)"];

$dataTrpParticlePreset.item_gain = [4,[[0,0,0.2,0.5,0.8,0.5,1,0]],[[0,1,1,1],1],[[0,0,1,0],1],[[0,"#ffc73b",1,"#70eaff"]],0,[0,0],null,[0,0],[0,0],0,0,0,[1.2,1.2],1,0.03,1,0,-1,10000,[0,0],3,[0,0],[0,0,96,96],0,0,"line_ray2,line_ray1",0,
	"アイテム取得演出"];
$dataTrpParticlePreset.item_gain2 = [4,[[0,0,0.2,0.8,1,0]],[[0,0,0.2,0.8,1,1.5],0.4],[[0,15,1,0],0.5],[[0,"#dbf9ff",1,"#dbf9ff"]],1,[0,0],null,[0,360],[-120,120],0,0,0,[0.5,2],1,0.1,0.5,1,-1,10000,[0,0],1,[0,0],[-72,-72,144,144],0,0,"shine2",0,
	"アイテム取得演出"];
$dataTrpParticlePreset.item_gain3 = [4,[[0,1,1,0]],[[0,0,0.15,3,1,4],1],[[0,1,1,1],1],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[0,0],[0,0],0,0,0,[0.6,0.6],3,0.01,1,1,0.011,10000,[0,0],0,[0,0],null,0,0,"circle2",0,
	"アイテム取得演出"];
$dataTrpParticlePreset.cracker_min_l = [4,[[0,1,0.5,1,0.9,0.5,1,0]],[[0,0.1,0.8,0.1,1,0],0.8],[[0,1300,0.2,200,1,0],0.8],[[0,"#103bff",0.25,"#ff0000",0.5,"#ffe200",0.75,"#f200ff",1,"#a3ffc8"]],1,[0,30],null,[-32,-48],[360,-360],0,0,0,[0.8,1.5],0,0.002,1,1,0.05,10000,[20,0.2],0,[6,-10],null,0,0,"square1",0,
	"クラッカー(キャラ用・左から)"];
$dataTrpParticlePreset.cracker_min_r = [4,[[0,1,0.5,1,0.9,0.5,1,0]],[[0,0.1,0.8,0.1,1,0],0.8],[[0,1300,0.2,200,1,0],0.8],[[0,"#103bff",0.25,"#ff0000",0.5,"#ffe200",0.75,"#f200ff",1,"#a3ffc8"]],1,[0,30],null,[-148,-132],[360,-360],0,0,0,[0.8,1.5],0,0.002,1,1,0.05,10000,[20,0.2],0,[-6,-10],null,0,0,"square1",0,
	"クラッカー(キャラ用・右から)"];
$dataTrpParticlePreset.warp0 = [4,[[0,1,0.5,1,1,0]],[[0,0,0.25,10,1,25],1],[[0,1,1,1],1],[[0,"#0059ff",1,"#798dff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[0.6,0.6],2,1,1,0,1.01,10000,[0,0],0,[0,-24],null,0,0,"circle2",0,
	"ワープ演出"];
$dataTrpParticlePreset.warp1 = [4,[[0,1,0.5,1,1,0]],[[0,0,0.1,0.6,0.7,0.6,1,1],0.5],[[0,1,1,1],1],[[0,"#00d9ff",1,"#0300ff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[1,1],2,0.2,1,5,-1,10000,[0,0],3,[0,0],[0,-24,12,80],0,0,"hexagon_line2,hexagon1",0,
	"ワープ演出"];
$dataTrpParticlePreset.warp2 = [4,[[0,1,0.5,1,1,0]],[[0,0,0.1,3,0.5,3,1,4],0.5],[[0,150,1,1],1],[[0,"#9064ff",1,"#3d50ff"]],0,[0,0],null,[180,180],[0,0],0,0,0,[1,1],1,0.05,1,1,-1,10000,[0,0],3,[0,0],[0,-24,64,80],0,0,"particle4",0,
	"ワープ演出"];
$dataTrpParticlePreset.warp3 = [4,[[0,0,0.2,0.5,0.8,0.5,1,0]],[[0,1.2,1,1.2],1],[[0,0,1,0],1],[[0,"#583bff",1,"#127288"]],0,[0,0],null,[0,0],[0,0],0,0,0,[0.8,0.8],1,0.03,1,0,-1,10000,[0,0],3,[0,0],[0,-24,120,120],0,0,"line_ray2,line_ray1",0,
	"ワープ演出"];


//groups
$dataTrpParticleGroupsPreset.item_gain = {"repeat":-1,"list":["play cracker_l screen","play cracker_r screen","play item_gain3 target","set item_gain target def below","set item_gain2 target"],"targetType":14,
	"comment":"アイテム入手"};
$dataTrpParticleGroupsPreset.wing = {"repeat":-1,"list":["set wing_l target","set wing_l2 target","set wing_r target","set wing_r2 target"],"targetType":0,
	"comment":"光の翼"};
$dataTrpParticleGroupsPreset.warp = {"repeat":-1,"list":["set warp0 target","set warp1 target","set warp2 target","set warp3 target"],"targetType":0,
	"comment":"ワープ演出"};



//=============================================================================
// ExPreset2
//=============================================================================
$dataTrpParticlePreset["_auto:0:wind_w/h"] = [4,[[0,1,1,1]],[[0,0,1,0],0.5],[[0,500,1,500],0.5],[[0,"#ffffff",1,"#ffffff"]],0,[1000,-200],null,[15,30],[0,0],0,0,0,[1,2],1,0.1,0.3,1,-1,1000,[5,0.1],1,[0,0],[-408,-312,100,624],0,0,null,6,
    "wind_wメイン：風の動き"];
$dataTrpParticlePreset["_sub:0:wind_w/h"] = [4,[[0,0.6,1,0]],[[0,0.25,1,0.25],1],[[0,0,1,0],1],[[0,"#8dffb6",1,"#8dffb6"]],0,[0,0],null,[0,0],[0,0],0,0,0,[0.5,0.5],1,0.01,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"line_oval1",0,
    "wind_wサブ：風の軌跡"];
$dataTrpParticlePreset["_sub:1:wind_w/h"] = [4,[[0,0,0.5,1,1,0]],[[0,0.2,1,0.2],1],[[0,300,1,1],1],[[0,"#066f0b",1,"#46cf4c"]],1,[0,0],null,[0,0],[0,0],0,0,0,[1,1],0,0.15,0.5,1,-1,10000,[10,0.1],0,[0,0],null,0,0,"leaf1",0,
    "wind_wサブ2：風に舞う葉っぱ"];

$dataTrpParticlePreset["_auto:0:matrix_w/h"] = [4,[[0,0,1,0]],[[0,0,1,0],0.4],[[0,600,1,1000],0.7],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[90,90],[0,0],0,0,0,[1,1],1,0.15,1,1,-1,10000,[0,0],1,[0,0],[-404,-400,808,50],0,0,null,6,
    "matrix_wメイン：文字の流れ"];
$dataTrpParticlePreset["_sub:0:matrix_w/h"] = [4,[[0,1,1,0]],[[0,0.8,1,0.8],1],[[0,0,1,0],1],[[0,"#2ef1ff",1,"#5fffc0"]],0,[0,0],null,[0,0],[0,0],0,0,0,[3,3],1,0.04,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"tile:Particles_Digital:17,tile:Particles_Digital:0,tile:Particles_Digital:22,tile:Particles_Digital:21,tile:Particles_Digital:35,tile:Particles_Digital:50,tile:Particles_Digital:82,tile:Particles_Digital:99,tile:Particles_Digital:85,tile:Particles_Digital:54,tile:Particles_Digital:68,tile:Particles_Digital:97,tile:Particles_Digital:41,tile:Particles_Digital:61,tile:Particles_Digital:92,tile:Particles_Digital:107,tile:Particles_Digital:137,tile:Particles_Digital:168,tile:Particles_Digital:170,tile:Particles_Digital:142,tile:Particles_Digital:100,tile:Particles_Digital:101,tile:Particles_Digital:102,tile:Particles_Digital:103,tile:Particles_Digital:112,tile:Particles_Digital:113,tile:Particles_Digital:114,tile:Particles_Digital:115,tile:Particles_Digital:116,tile:Particles_Digital:59,tile:Particles_Digital:105,tile:Particles_Digital:140",0,
    "matrix_wサブ：ランダムな文字"];

$dataTrpParticlePreset["_auto:0:digital_w/h"] = [4,[[0,0,1,0]],[[0,1,1,1],0.4],[[0,0,1,0],1],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[0.5,3],1,0.1,0.5,1,-1,10000,[0,0],1,[0,0],[-408,-312,816,624],0,0,null,6,
    "digital_wメイン：文字位置&需要"];
$dataTrpParticlePreset["_sub:0:digital_w/h"] = [4,[[0,0.5,1,0]],[[0,1.2,1,1.2],1],[[0,0,1,0],1],[[0,"#30eaff",1,"#30c8ff"]],0,[0,0],null,[0,0],[0,0],0,0,0,[0.072,0.072],0,0.072,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"tile:Particles_Digital:0,tile:Particles_Digital:36,tile:Particles_Digital:66,tile:Particles_Digital:113,tile:Particles_Digital:115,tile:Particles_Digital:69,tile:Particles_Digital:18,tile:Particles_Digital:100,tile:Particles_Digital:101,tile:Particles_Digital:103,tile:Particles_Digital:10,tile:Particles_Digital:78,tile:Particles_Digital:123,tile:Particles_Digital:155,tile:Particles_Digital:141,tile:Particles_Digital:72",0,
    "digital_wサブ：すぐ消える１文字１文字"];
$dataTrpParticlePreset["_auto:0:digital_01_w/h"] = [4,[[0,0,1,0]],[[0,0,1,0],1],[[0,0,1,0],1],[[0,"#ffffff",1,"#ffffff"]],0,[0,0],null,[0,360],[0,0],0,0,0,[999999999,999999999],1,0.1,1,36,0.11,36,[0,0],4,[-396,-300],[0,0,0,0,0,24,0],0,0,null,6,
    "digital_01_wメイン：横並びの位置指定"];
$dataTrpParticlePreset["_sub:0:digital_01_w/h"] = [4,[[0,0.5,1,0.8]],[[0,0.6,1,0.6],1],[[0,0,1,0],1],[[0,"#2c90d2",1,"#2c90d2"]],0,[0,0],null,[0,0],[0,0],0,0,0,[0.09,0.09],1,0.072,1,20,-1,999999,[0,0],4,[0,0],[360,0,0,0,0,0,32],0,0,"tile:Particles_Digital:99,tile:Particles_Digital:100",0,
    "digital_01_wサブ：縦並びに01発生"];

$dataTrpParticlePreset["_auto:0:narration_fire_s/h"] = [4,[[0,0,0.15,1,1,0]],[[0,2,1,0],0.5],[[0,200,0.2,100,1,100],0.5],[[0,"#ff2e2e",1,"#ffb92e"]],0,[0,0],null,[-80,-100],[50,-50],0,2,0,[0.8,1],1,0.005,0.5,1,-1,10000,[0,0],1,[0,0],[-408,350,816,0],0,0,"smoke2,smoke1",6,
    "narration_fire_sメイン：画面下部の炎"];
[4,[[0,0,0.5,1,1,0]],[[0,0,0.5,0.2,1,0],0.1],[[0,100,1,0],1],[[0,"#ff4242",1,"#ffdf42"]],0,[0,0],null,[0,360],[0,0],0,0,0,[1,1],1,0.1,0.5,1,0.11,10000,[5,0.1],0,[0,0],null,0,0,"flame1g,particle7",0,
    "narration_fire_sサブ：小さな火の粉"];

//groups
$dataTrpParticleGroupsPreset.wind_w = {"repeat":-1,"list":["set _auto:0 target","sub set _auto:0 _sub:0 0 -1 0 1 1","sub set _auto:0 _sub:1 0 -1 0.3 0 0"],"targetType":6,
    "comment":"風の天候"};

$dataTrpParticleGroupsPreset.matrix_w = {"repeat":-1,"list":["set _auto:0 weather def above","sub set _auto:0 _sub:0 0 -1 0 0 1","loop _auto:0 48 1000","filter _auto:0 glow 8 2 9.5 0 255 255"],"targetType":6,
    "comment":"マト○ックス風に文字が流れる演出"};
$dataTrpParticleGroupsPreset.digital_w = {"repeat":-1,"list":["set _auto:0 target","sub set _auto:0 _sub:0 0 -1 0 0 1","loop _auto:0 48 1000","filter _auto:0 glow 10 10 9.5 0 200 255"],"targetType":6,
    "comment":"素早く切り替わる文字"};
$dataTrpParticleGroupsPreset.digital_01_w = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0 -1 0 0 0","filter _auto:0 glow 1 3 20 0 200 255","loop _auto:0 24 24"],"targetType":6,
    "comment":"01が並ぶ背景"};

$dataTrpParticleGroupsPreset.narration_fire_s = {"repeat":-1,"list":["set _auto:0 target","sub set _auto:0 _sub:0 0.3 -1 0.5 1 0"],"targetType":6,
    "comment":"ナレーション用、画面下部の炎"};


//=============================================================================
// ExPreset3
//=============================================================================

$dataTrpParticlePreset["fw_base"] = [4,[[0,1,0.7,1,1,0]],[[0,0.15,1,0.1],1],[[0,1000,0.5,200,0.8,100,1,0],1],[[0,"#f8cda8",1,"#9f9f9f"]],0,[0,0],null,[-90,-90],[0,0],10,0,0,[1.3,1.3],1,0.01,1,5,0.011,10000,[0,0],4,[0,312],[0,0,0.015,1,0,0,0],0,0,"particle7",0,
    "花火~打ち上げ用[橙]"];
// $dataTrpParticlePreset["fw_base_yellow"] = [4,[[0,0.8,0.7,0.8,1,0]],[[0,0.15,1,0.15],0.5],[[0,1000,0.5,200,0.8,100,1,0],1],[[0,"#fffa76",1,"#fffdcd"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1.3,1.3],1,0.01,1,5,0.011,10000,[0,0],4,[0,312],[0,0,0.015,1,0,0,0],0,0,"particle9",0,
//     "花火~打ち上げ用[黄]"];
// $dataTrpParticlePreset["fw_base_green"] = [4,[[0,0.8,0.7,0.8,1,0]],[[0,0.15,1,0.15],0.5],[[0,1000,0.5,200,0.8,100,1,0],1],[[0,"#a1ff76",1,"#daface"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1.3,1.3],1,0.01,1,5,0.011,10000,[0,0],4,[0,312],[0,0,0.015,1,0,0,0],0,0,"particle9",0,
//     "花火~打ち上げ用[緑]"];
// $dataTrpParticlePreset["fw_base_blue"] = [4,[[0,0.8,0.7,0.8,1,0]],[[0,0.15,1,0.15],0.5],[[0,1000,0.5,200,0.8,100,1,0],1],[[0,"#276aff",1,"#c2eaff"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1.3,1.3],1,0.01,1,5,0.011,10000,[0,0],4,[0,312],[0,0,0.015,1,0,0,0],0,0,"particle9",0,
//     "花火~打ち上げ用[青]"];
// $dataTrpParticlePreset["fw_base_purple"] = [4,[[0,0.8,0.7,0.8,1,0]],[[0,0.15,1,0.15],0.5],[[0,1000,0.5,200,0.8,100,1,0],1],[[0,"#b169ff",1,"#e7cdff"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1.3,1.3],1,0.01,1,5,0.011,10000,[0,0],4,[0,312],[0,0,0.015,1,0,0,0],0,0,"particle9",0,
//     "花火~打ち上げ用[紫]"];
// $dataTrpParticlePreset["fw_base_red"] = [4,[[0,0.8,0.7,0.8,1,0]],[[0,0.15,1,0.15],0.5],[[0,1000,0.5,200,0.8,100,1,0],1],[[0,"#ff4444",1,"#ffc2c2"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1.3,1.3],1,0.01,1,5,0.011,10000,[0,0],4,[0,312],[0,0,0.015,1,0,0,0],0,0,"particle9",0,
//     "花火~打ち上げ用[赤]"];


//fw_twinkle
$dataTrpParticlePreset["_auto:0:fw_twinkle/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#c29474",1,"#e4c7ad"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_twinkle_yellow/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#f7fd85",1,"#fffdc2"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""];
$dataTrpParticlePreset["_auto:0:fw_twinkle_green/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#a2ddaa",1,"#e2f8d4"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_twinkle_blue/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#8eaefd",1,"#b1bffd"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_twinkle_purple/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#ab9dfa",1,"#ecddfa"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_twinkle_red/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#dda2b4",1,"#f8d4d4"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_sub:0:fw_twinkle/h"] = [4,[[0,0,0.1,1,0.2,0,0.3,1,0.4,0,0.5,1,0.6,0,0.7,1,1,0]],[[0,0.1,0.7,0.1,1,0],0.5],[[0,0,1,0],1],[[0,"#f8cf66",1,"#ffffff"]],0,[0,20],null,[0,360],[0,0],0,0,0,[1,2],1,0.1,1,1,0.11,10000,[0,0],0,[0,0],null,0,0,"flare",0,""];
$dataTrpParticlePreset["_sub:0:fw_twinkle_yellow/h"] = [4,[[0,0,0.1,1,0.2,0,0.3,1,0.4,0,0.5,1,0.6,0,0.7,1,1,0]],[[0,0.1,0.7,0.1,1,0],0.5],[[0,0,1,0],1],[[0,"#ecf866",1,"#ffffff"]],0,[0,20],null,[0,360],[0,0],0,0,0,[1,2],1,0.1,1,1,0.11,10000,[0,0],0,[0,0],null,0,0,"flare",0,""];
$dataTrpParticlePreset["_sub:0:fw_twinkle_green/h"] = [4,[[0,0,0.1,1,0.2,0,0.3,1,0.4,0,0.5,1,0.6,0,0.7,1,1,0]],[[0,0.1,0.7,0.1,1,0],0.5],[[0,0,1,0],1],[[0,"#66f879",1,"#ffffff"]],0,[0,20],null,[0,360],[0,0],0,0,0,[1,2],1,0.1,1,1,0.11,10000,[0,0],0,[0,0],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_sub:0:fw_twinkle_blue/h"] = [4,[[0,0,0.1,1,0.2,0,0.3,1,0.4,0,0.5,1,0.6,0,0.7,1,1,0]],[[0,0.1,0.7,0.1,1,0],0.5],[[0,0,1,0],1],[[0,"#6692f8",1,"#ffffff"]],0,[0,20],null,[0,360],[0,0],0,0,0,[1,2],1,0.1,1,1,0.11,10000,[0,0],0,[0,0],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_sub:0:fw_twinkle_purple/h"] = [4,[[0,0,0.1,1,0.2,0,0.3,1,0.4,0,0.5,1,0.6,0,0.7,1,1,0]],[[0,0.1,0.7,0.1,1,0],0.5],[[0,0,1,0],1],[[0,"#8866f8",1,"#ffffff"]],0,[0,20],null,[0,360],[0,0],0,0,0,[1,2],1,0.1,1,1,0.11,10000,[0,0],0,[0,0],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_sub:0:fw_twinkle_red/h"] = [4,[[0,0,0.1,1,0.2,0,0.3,1,0.4,0,0.5,1,0.6,0,0.7,1,1,0]],[[0,0.1,0.7,0.1,1,0],0.5],[[0,0,1,0],1],[[0,"#f47878",1,"#ffffff"]],0,[0,20],null,[0,360],[0,0],0,0,0,[1,2],1,0.1,1,1,0.11,10000,[0,0],0,[0,0],null,0,0,"flare",0,""]
$dataTrpParticleGroupsPreset["fw_twinkle"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.9 -1 3 0 0"],"targetType":0,
    "comment":"花火~キラキラ[橙]"};
$dataTrpParticleGroupsPreset["fw_twinkle_yellow/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.9 -1 3 0 0"],"targetType":0,
    "comment":"花火~キラキラ[黄]"};
$dataTrpParticleGroupsPreset["fw_twinkle_green/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.9 -1 3 0 0"],"targetType":0,
    "comment":"花火~キラキラ[緑]"};
$dataTrpParticleGroupsPreset["fw_twinkle_blue/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.9 -1 3 0 0"],"targetType":0,
    "comment":"花火~キラキラ[青]"};
$dataTrpParticleGroupsPreset["fw_twinkle_purple/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.9 -1 3 0 0"],"targetType":0,
    "comment":"花火~キラキラ[紫]"};
$dataTrpParticleGroupsPreset["fw_twinkle_red/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.9 -1 3 0 0"],"targetType":0,
    "comment":"花火~キラキラ[赤]"};


//fw_kiku
$dataTrpParticlePreset["_auto:0:fw_kiku/h"] = [4,[[0,2,0.11,1,0.5,1,1,0]],[[0,2,0.15,1.5,0.5,0.2,1,0],1],[[0,1500,0.1,100,1,10],0.8],[[0,"#ffffff",1,"#ff8e3e"]],1,[0,2],null,[-240,60],[50,-50],0,0,0,[1,2.5],1,0.001,1,1,0.04,10000,[0,0],0,[0,-300],null,0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_kiku_yellow/h"] = [4,[[0,2,0.11,1,0.5,1,1,0]],[[0,2,0.15,1.5,0.5,0.2,1,0],1],[[0,1500,0.1,100,1,10],0.8],[[0,"#ffffff",1,"#ffcf3e"]],1,[0,2],null,[-240,60],[50,-50],0,0,0,[1,2.5],1,0.001,1,1,0.04,10000,[0,0],0,[0,-300],null,0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_kiku_green/h"] = [4,[[0,2,0.11,1,0.5,1,1,0]],[[0,2,0.15,1.5,0.5,0.2,1,0],1],[[0,1500,0.1,100,1,10],0.8],[[0,"#ffffff",1,"#77ad4a"]],1,[0,2],null,[-240,60],[50,-50],0,0,0,[1,2.5],1,0.001,1,1,0.04,10000,[0,0],0,[0,-300],null,0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_kiku_blue/h"] = [4,[[0,2,0.11,1,0.5,1,1,0]],[[0,2,0.15,1.5,0.5,0.2,1,0],1],[[0,1500,0.1,100,1,10],0.8],[[0,"#ffffff",1,"#4a68ad"]],1,[0,2],null,[-240,60],[50,-50],0,0,0,[1,2.5],1,0.001,1,1,0.04,10000,[0,0],0,[0,-300],null,0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_kiku_purple/h"] = [4,[[0,2,0.11,1,0.5,1,1,0]],[[0,2,0.15,1.5,0.5,0.2,1,0],1],[[0,1500,0.1,100,1,10],0.8],[[0,"#ffffff",1,"#7a4aad"]],1,[0,2],null,[-240,60],[50,-50],0,0,0,[1,2.5],1,0.001,1,1,0.04,10000,[0,0],0,[0,-300],null,0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_kiku_red/h"] = [4,[[0,2,0.11,1,0.5,1,1,0]],[[0,2,0.15,1.5,0.5,0.2,1,0],1],[[0,1500,0.1,100,1,10],0.8],[[0,"#ffffff",1,"#ed5942"]],1,[0,2],null,[-240,60],[50,-50],0,0,0,[1,2.5],1,0.001,1,1,0.04,10000,[0,0],0,[0,-300],null,0,0,"particle8",0,""]
$dataTrpParticlePreset["_sub:0:fw_kiku/h"] = [4,[[0,1,1,0]],[[0,0.3,0.5,0.2,1,0],1],[[0,0,1,0],1],[[0,"#f6857f",1,"#ffffff"]],0,[0,0],null,[0,0],[0,0],10,0,0,[2.5,3],1,0.06,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_kiku_yellow/h"] = [4,[[0,1,1,0]],[[0,0.3,0.5,0.2,1,0],1],[[0,0,1,0],1],[[0,"#f6e27f",1,"#ffffff"]],0,[0,0],null,[0,0],[0,0],10,0,0,[2.5,3],1,0.06,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_kiku_green/h"] = [4,[[0,1,1,0]],[[0,0.3,0.5,0.2,1,0],1],[[0,0,1,0],1],[[0,"#99ca87",1,"#ffffff"]],0,[0,0],null,[0,0],[0,0],10,0,0,[2.5,3],1,0.06,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_kiku_blue/h"] = [4,[[0,1,1,0]],[[0,0.3,0.5,0.2,1,0],1],[[0,0,1,0],1],[[0,"#5081b8",1,"#ffffff"]],0,[0,0],null,[0,0],[0,0],10,0,0,[2.5,3],1,0.06,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_kiku_purple/h"] = [4,[[0,1,1,0]],[[0,0.3,0.5,0.2,1,0],1],[[0,0,1,0],1],[[0,"#7e5bb2",1,"#ffffff"]],0,[0,0],null,[0,0],[0,0],10,0,0,[2.5,3],1,0.06,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_kiku_red/h"] = [4,[[0,1,1,0]],[[0,0.3,0.5,0.2,1,0],1],[[0,0,1,0],1],[[0,"#b25b78",1,"#ffffff"]],0,[0,0],null,[0,0],[0,0],10,0,0,[2.5,3],1,0.06,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticleGroupsPreset["fw_kiku"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.06 0.5 0.05 1 0"],"targetType":0,
    "comment":"花火~菊(大)[橙]"};
$dataTrpParticleGroupsPreset["fw_kiku_yellow/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.06 0.5 0.05 1 0"],"targetType":0,
    "comment":"花火~菊(大)[黄]"};
$dataTrpParticleGroupsPreset["fw_kiku_green/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.06 0.5 0.05 1 0"],"targetType":0,
    "comment":"花火~菊(大)[緑]"};
$dataTrpParticleGroupsPreset["fw_kiku_blue/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.06 0.5 0.05 1 0"],"targetType":0,
    "comment":"花火~菊(大)[青]"};
$dataTrpParticleGroupsPreset["fw_kiku_purple/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.06 0.5 0.05 1 0"],"targetType":0,
    "comment":"花火~菊(大)[紫]"};
$dataTrpParticleGroupsPreset["fw_kiku_red/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.06 0.5 0.05 1 0"],"targetType":0,
    "comment":"花火~菊(大)[赤]"};


//fw_dual
$dataTrpParticlePreset["_auto:0:fw_dual/h"] = [4,[[0,1,0.11,1,0.7,1,1,0]],[[0,1.2,0.15,0.6,0.7,0.3,1,0],1],[[0,1300,0.15,30,1,1],0.5],[[0,"#ddb585",1,"#ffaf3e"]],1,[0,0],null,[0,0],[50,-50],0,0,0,[2,2],1,0.001,1,2,0.05,10000,[0,0],3,[0,-300],[0,0,0,0],0,0,"particle9",0,""]
$dataTrpParticlePreset["_auto:0:fw_dual_yellow/h"] = [4,[[0,1,0.11,1,0.7,1,1,0]],[[0,1.2,0.15,0.6,0.7,0.3,1,0],1],[[0,1300,0.15,30,1,1],0.5],[[0,"#dddd85",1,"#ffcf3e"]],1,[0,0],null,[0,0],[50,-50],0,0,0,[2,2],1,0.001,1,2,0.05,10000,[0,0],3,[0,-300],[0,0,0,0],0,0,"particle9",0,""]
$dataTrpParticlePreset["_auto:0:fw_dual_green/h"] = [4,[[0,1,0.11,1,0.7,1,1,0]],[[0,1.2,0.15,0.6,0.7,0.3,1,0],1],[[0,1300,0.15,30,1,1],0.5],[[0,"#5fa963",1,"#54bf67"]],1,[0,0],null,[0,0],[50,-50],0,0,0,[2,2],1,0.001,1,2,0.05,10000,[0,0],3,[0,-300],[0,0,0,0],0,0,"particle9",0,""]
$dataTrpParticlePreset["_auto:0:fw_dual_blue/h"] = [4,[[0,1,0.11,1,0.7,1,1,0]],[[0,1.2,0.15,0.6,0.7,0.3,1,0],1],[[0,1300,0.15,30,1,1],0.5],[[0,"#5c7bc6",1,"#243ff6"]],1,[0,0],null,[0,0],[50,-50],0,0,0,[2,2],1,0.001,1,2,0.05,10000,[0,0],3,[0,-300],[0,0,0,0],0,0,"particle9",0,""]
$dataTrpParticlePreset["_auto:0:fw_dual_purple/h"] = [4,[[0,1,0.11,1,0.7,1,1,0]],[[0,1.2,0.15,0.6,0.7,0.3,1,0],1],[[0,1300,0.15,30,1,1],0.5],[[0,"#6a5adf",1,"#4e24f6"]],1,[0,0],null,[0,0],[50,-50],0,0,0,[2,2],1,0.001,1,2,0.05,10000,[0,0],3,[0,-300],[0,0,0,0],0,0,"particle9",0,""]
$dataTrpParticlePreset["_auto:0:fw_dual_red/h"] = [4,[[0,1,0.11,1,0.7,1,1,0]],[[0,1.2,0.15,0.6,0.7,0.3,1,0],1],[[0,1300,0.15,30,1,1],0.5],[[0,"#eb8c8c",1,"#f66060"]],1,[0,0],null,[0,0],[50,-50],0,0,0,[2,2],1,0.001,1,2,0.05,10000,[0,0],3,[0,-300],[0,0,0,0],0,0,"particle9",0,""]
$dataTrpParticlePreset["_auto:1:fw_dual/h"] = [4,[[0,1,0.11,1,0.5,1,1,0]],[[0,1.2,0.15,0.6,0.7,0.25,1,0],1],[[0,700,0.13,20,1,10],0.2],[[0,"#94b976",1,"#70c847"]],1,[0,0],null,[0,0],[50,-50],0,0,0,[2,2],1,0.001,1,2,0.035,10000,[0,0],3,[0,-300],[0,0,0,20],0,0,"particle9",0,""]
$dataTrpParticlePreset["_auto:1:fw_dual_yellow/h"] = [4,[[0,1,0.11,1,0.5,1,1,0]],[[0,1.2,0.15,0.6,0.7,0.25,1,0],1],[[0,700,0.13,20,1,10],0.2],[[0,"#76b9a4",1,"#4785c8"]],1,[0,0],null,[0,0],[50,-50],0,0,0,[2,2],1,0.001,1,2,0.035,10000,[0,0],3,[0,-300],[0,0,0,20],0,0,"particle9",0,""]
$dataTrpParticlePreset["_auto:1:fw_dual_green/h"] = [4,[[0,1,0.11,1,0.5,1,1,0]],[[0,1.2,0.15,0.6,0.7,0.25,1,0],1],[[0,700,0.13,20,1,10],0.2],[[0,"#7696b9",1,"#4b47c8"]],1,[0,0],null,[0,0],[50,-50],0,0,0,[2,2],1,0.001,1,2,0.035,10000,[0,0],3,[0,-300],[0,0,0,20],0,0,"particle9",0,""]
$dataTrpParticlePreset["_auto:1:fw_dual_blue/h"] = [4,[[0,1,0.11,1,0.5,1,1,0]],[[0,1.2,0.15,0.6,0.7,0.25,1,0],1],[[0,700,0.13,20,1,10],0.2],[[0,"#ae67cd",1,"#9b47c8"]],1,[0,0],null,[0,0],[50,-50],0,0,0,[2,2],1,0.001,1,2,0.035,10000,[0,0],3,[0,-300],[0,0,0,20],0,0,"particle9",0,""]
$dataTrpParticlePreset["_auto:1:fw_dual_purple/h"] = [4,[[0,1,0.11,1,0.5,1,1,0]],[[0,1.2,0.15,0.6,0.7,0.25,1,0],1],[[0,700,0.13,20,1,10],0.2],[[0,"#cd8967",1,"#c88e47"]],1,[0,0],null,[0,0],[50,-50],0,0,0,[2,2],1,0.001,1,2,0.035,10000,[0,0],3,[0,-300],[0,0,0,20],0,0,"particle9",0,""]
$dataTrpParticlePreset["_auto:1:fw_dual_red/h"] = [4,[[0,1,0.11,1,0.5,1,1,0]],[[0,1.2,0.15,0.6,0.7,0.25,1,0],1],[[0,700,0.13,20,1,10],0.2],[[0,"#cdb967",1,"#c8b347"]],1,[0,0],null,[0,0],[50,-50],0,0,0,[2,2],1,0.001,1,2,0.035,10000,[0,0],3,[0,-300],[0,0,0,20],0,0,"particle9",0,""]
$dataTrpParticleGroupsPreset["fw_dual"] = {"repeat":-1,"list":["play _auto:0 target def back","play _auto:1 target def back"],"targetType":0,
    "comment":"花火~２色[橙]"};
$dataTrpParticleGroupsPreset["fw_dual_yellow/h"] = {"repeat":-1,"list":["play _auto:0 target def back","play _auto:1 target def back"],"targetType":0,
    "comment":"花火~２色[黄]"};
$dataTrpParticleGroupsPreset["fw_dual_green/h"] = {"repeat":-1,"list":["play _auto:0 target def back","play _auto:1 target def back"],"targetType":0,
    "comment":"花火~２色[緑]"};
$dataTrpParticleGroupsPreset["fw_dual_blue/h"] = {"repeat":-1,"list":["play _auto:0 target def back","play _auto:1 target def back"],"targetType":0,
    "comment":"花火~２色[青]"};
$dataTrpParticleGroupsPreset["fw_dual_purple/h"] = {"repeat":-1,"list":["play _auto:0 target def back","play _auto:1 target def back"],"targetType":0,
    "comment":"花火~２色[紫]"};
$dataTrpParticleGroupsPreset["fw_dual_red/h"] = {"repeat":-1,"list":["play _auto:0 target def back","play _auto:1 target def back"],"targetType":0,
    "comment":"花火~２色[赤]"};


//fw_simple
$dataTrpParticlePreset["_auto:0:fw_simple/h"] = [4,[[0,0,0.11,1,0.4,1,1,0]],[[0,0.15,0.15,0.15,0.8,0.08,1,0],0.8],[[0,1500,0.12,200,0.2,50,1,1],0.1],[[0,"#fbbb9b",1,"#f4a84a"]],1,[0,0],null,[0,360],[0,0],0,0,0,[1.4,1.6],1,0.001,1,10,0.011,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_simple_yellow/h"] = [4,[[0,0,0.11,1,0.4,1,1,0]],[[0,0.15,0.15,0.15,0.8,0.08,1,0],0.8],[[0,1500,0.12,200,0.2,50,1,1],0.1],[[0,"#fbe09b",1,"#f4ca4a"]],1,[0,0],null,[0,360],[0,0],0,0,0,[1.4,1.6],1,0.001,1,10,0.011,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_simple_green/h"] = [4,[[0,0,0.11,1,0.4,1,1,0]],[[0,0.15,0.15,0.15,0.8,0.08,1,0],0.8],[[0,1500,0.12,200,0.2,50,1,1],0.1],[[0,"#6dad78",1,"#41cb5f"]],1,[0,0],null,[0,360],[0,0],0,0,0,[1.4,1.6],1,0.001,1,10,0.011,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_simple_blue/h"] = [4,[[0,0,0.11,1,0.4,1,1,0]],[[0,0.15,0.15,0.15,0.8,0.08,1,0],0.8],[[0,1500,0.12,200,0.2,50,1,1],0.1],[[0,"#3d7df3",1,"#5e84eb"]],1,[0,0],null,[0,360],[0,0],0,0,0,[1.4,1.6],1,0.001,1,10,0.011,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_simple_purple/h"] = [4,[[0,0,0.11,1,0.4,1,1,0]],[[0,0.15,0.15,0.15,0.8,0.08,1,0],0.8],[[0,1500,0.12,200,0.2,50,1,1],0.1],[[0,"#996bfa",1,"#8764fa"]],1,[0,0],null,[0,360],[0,0],0,0,0,[1.4,1.6],1,0.001,1,10,0.011,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_simple_red/h"] = [4,[[0,0,0.11,1,0.4,1,1,0]],[[0,0.15,0.15,0.15,0.8,0.08,1,0],0.8],[[0,1500,0.12,200,0.2,50,1,1],0.1],[[0,"#ed9494",1,"#fa6464"]],1,[0,0],null,[0,360],[0,0],0,0,0,[1.4,1.6],1,0.001,1,10,0.011,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticleGroupsPreset["fw_simple"] = {"repeat":-1,"list":["play _auto:0 target def back"],"targetType":0,
    "comment":"花火~シンプル[橙]"};
$dataTrpParticleGroupsPreset["fw_simple_yellow/h"] = {"repeat":-1,"list":["play _auto:0 target def back"],"targetType":0,
    "comment":"花火~シンプル[黄]"};
$dataTrpParticleGroupsPreset["fw_simple_green/h"] = {"repeat":-1,"list":["play _auto:0 target def back"],"targetType":0,
    "comment":"花火~シンプル[緑]"};
$dataTrpParticleGroupsPreset["fw_simple_blue/h"] = {"repeat":-1,"list":["play _auto:0 target def back"],"targetType":0,
    "comment":"花火~シンプル[青]"};
$dataTrpParticleGroupsPreset["fw_simple_purple/h"] = {"repeat":-1,"list":["play _auto:0 target def back"],"targetType":0,
    "comment":"花火~シンプル[紫]"};
$dataTrpParticleGroupsPreset["fw_simple_red/h"] = {"repeat":-1,"list":["play _auto:0 target def back"],"targetType":0,
    "comment":"花火~シンプル[赤]"};


//fw_change
$dataTrpParticlePreset["_auto:0:fw_change/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#fa9b46",1,"#f1de90"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_change_yellow/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#fad646",1,"#f1e690"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_change_green/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#5da632",1,"#c7f190"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_change_blue/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#3acdfa",1,"#3062ed"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_change_purple/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#903afa",1,"#3059ed"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_auto:0:fw_change_red/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0.1,0.15,0.1,0.8,0.05,1,0],0.8],[[0,1200,0.1,200,0.2,50,1,1],0.1],[[0,"#fda5a5",1,"#fa4e2a"]],1,[0,0],null,[0,360],[50,-50],0,0,0,[2,2],1,0.1,1,200,0.11,10000,[0,0],0,[0,-300],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_sub:0:fw_change/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0,0.11,0.15,0.2,0.12,0.8,0.05,1,0],1],[[0,10,1,0],0.1],[[0,"#97d6c7",1,"#398fa9"]],1,[0,2],null,[0,0],[50,-50],0,0,0,[1.5,1.5],1,0.1,1,1,0.11,10000,[0,0],0,[0,0],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_sub:0:fw_change_yellow/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0,0.11,0.15,0.2,0.12,0.8,0.05,1,0],1],[[0,10,1,0],0.1],[[0,"#9798d6",1,"#2b4ee6"]],1,[0,2],null,[0,0],[50,-50],0,0,0,[1.5,1.5],1,0.1,1,1,0.11,10000,[0,0],0,[0,0],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_sub:0:fw_change_green/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0,0.11,0.15,0.2,0.12,0.8,0.05,1,0],1],[[0,10,1,0],0.1],[[0,"#b397d6",1,"#662be6"]],1,[0,2],null,[0,0],[50,-50],0,0,0,[1.5,1.5],1,0.1,1,1,0.11,10000,[0,0],0,[0,0],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_sub:0:fw_change_blue/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0,0.11,0.15,0.2,0.12,0.8,0.05,1,0],1],[[0,10,1,0],0.1],[[0,"#edb3b3",1,"#d1236c"]],1,[0,2],null,[0,0],[50,-50],0,0,0,[1.5,1.5],1,0.1,1,1,0.11,10000,[0,0],0,[0,0],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_sub:0:fw_change_purple/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0,0.11,0.15,0.2,0.12,0.8,0.05,1,0],1],[[0,10,1,0],0.1],[[0,"#edceb3",1,"#d17a23"]],1,[0,2],null,[0,0],[50,-50],0,0,0,[1.5,1.5],1,0.1,1,1,0.11,10000,[0,0],0,[0,0],null,0,0,"flare",0,""]
$dataTrpParticlePreset["_sub:0:fw_change_red/h"] = [4,[[0,0,0.11,1,0.5,1,1,0]],[[0,0,0.11,0.15,0.2,0.12,0.8,0.05,1,0],1],[[0,10,1,0],0.1],[[0,"#e0edb3",1,"#69d123"]],1,[0,2],null,[0,0],[50,-50],0,0,0,[1.5,1.5],1,0.1,1,1,0.11,10000,[0,0],0,[0,0],null,0,0,"flare",0,""]
$dataTrpParticleGroupsPreset["fw_change"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.8 -1 1 1 0 def back"],"targetType":0,
    "comment":"花火~色変化[橙]"};
$dataTrpParticleGroupsPreset["fw_change_yellow/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.8 -1 1 1 0 def back"],"targetType":0,
    "comment":"花火~色変化[黄]"};
$dataTrpParticleGroupsPreset["fw_change_green/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.8 -1 1 1 0 def back"],"targetType":0,
    "comment":"花火~色変化[緑]"};
$dataTrpParticleGroupsPreset["fw_change_blue/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.8 -1 1 1 0 def back"],"targetType":0,
    "comment":"花火~色変化[青]"};
$dataTrpParticleGroupsPreset["fw_change_purple/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.8 -1 1 1 0 def back"],"targetType":0,
    "comment":"花火~色変化[紫]"};
$dataTrpParticleGroupsPreset["fw_change_red/h"] = {"repeat":-1,"list":["play _auto:0 target def back","sub set _auto:0 _sub:0 0.8 -1 1 1 0 def back"],"targetType":0,
    "comment":"花火~色変化[赤]"};

//fw_kikus
$dataTrpParticlePreset["_auto:0:fw_kikus/h"] = [4,[[0,1,0.6,1,1,0]],[[0,1.5,0.11,1.2,0.6,0.3,1,0],1],[[0,700,0.11,150,0.6,40,1,0],0.85],[[0,"#ffffff",1,"#ff683e"]],1,[0,5],null,[-225,45],[50,-50],10,0,0,[0.9,1.3],1,0.001,1,1,0.012,10000,[0,0],0,[0,-300],null,0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_kikus_yellow/h"] = [4,[[0,1,0.6,1,1,0]],[[0,1.5,0.11,1.2,0.6,0.3,1,0],1],[[0,700,0.11,150,0.6,40,1,0],0.85],[[0,"#ffffff",1,"#ffcf3e"]],1,[0,5],null,[-225,45],[50,-50],10,0,0,[0.9,1.3],1,0.001,1,1,0.012,10000,[0,0],0,[0,-300],null,0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_kikus_green/h"] = [4,[[0,1,0.6,1,1,0]],[[0,1.5,0.11,1.2,0.6,0.3,1,0],1],[[0,700,0.11,150,0.6,40,1,0],0.85],[[0,"#ffffff",1,"#92cb91"]],1,[0,5],null,[-225,45],[50,-50],10,0,0,[0.9,1.3],1,0.001,1,1,0.012,10000,[0,0],0,[0,-300],null,0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_kikus_blue/h"] = [4,[[0,1,0.6,1,1,0]],[[0,1.5,0.11,1.2,0.6,0.3,1,0],1],[[0,700,0.11,150,0.6,40,1,0],0.85],[[0,"#bccff4",1,"#5580d4"]],1,[0,5],null,[-225,45],[50,-50],10,0,0,[0.9,1.3],1,0.001,1,1,0.012,10000,[0,0],0,[0,-300],null,0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_kikus_purple/h"] = [4,[[0,1,0.6,1,1,0]],[[0,1.5,0.11,1.2,0.6,0.3,1,0],1],[[0,700,0.11,150,0.6,40,1,0],0.85],[[0,"#ccbcf4",1,"#6855d4"]],1,[0,5],null,[-225,45],[50,-50],10,0,0,[0.9,1.3],1,0.001,1,1,0.012,10000,[0,0],0,[0,-300],null,0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_kikus_red/h"] = [4,[[0,1,0.6,1,1,0]],[[0,1.5,0.11,1.2,0.6,0.3,1,0],1],[[0,700,0.11,150,0.6,40,1,0],0.85],[[0,"#f4d1bc",1,"#d4559b"]],1,[0,5],null,[-225,45],[50,-50],10,0,0,[0.9,1.3],1,0.001,1,1,0.012,10000,[0,0],0,[0,-300],null,0,0,"particle8",0,""]
$dataTrpParticlePreset["_sub:0:fw_kikus/h"] = [4,[[0,1,1,0]],[[0,0.25,0.5,0.25,1,0],1],[[0,0,1,0],1],[[0,"#f6857f",1,"#ffffff"]],0,[0,0],null,[0,0],[0,0],10,0,0,[1.9,2.3],1,0.04,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_kikus_yellow/h"] = [4,[[0,1,1,0]],[[0,0.25,0.5,0.25,1,0],1],[[0,0,1,0],1],[[0,"#b1a15d",1,"#ddc96b"]],0,[0,0],null,[0,0],[0,0],10,0,0,[1.9,2.3],1,0.04,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_kikus_green/h"] = [4,[[0,1,1,0]],[[0,0.25,0.5,0.25,1,0],1],[[0,0,1,0],1],[[0,"#88cf8b",1,"#5cbf76"]],0,[0,0],null,[0,0],[0,0],10,0,0,[1.9,2.3],1,0.04,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_kikus_blue/h"] = [4,[[0,1,1,0]],[[0,0.25,0.5,0.25,1,0],1],[[0,0,1,0],1],[[0,"#2848bf",1,"#8589d8"]],0,[0,0],null,[0,0],[0,0],10,0,0,[1.9,2.3],1,0.04,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_kikus_purple/h"] = [4,[[0,1,1,0]],[[0,0.25,0.5,0.25,1,0],1],[[0,0,1,0],1],[[0,"#6e4ddd",1,"#9885d8"]],0,[0,0],null,[0,0],[0,0],10,0,0,[1.9,2.3],1,0.04,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_kikus_red/h"] = [4,[[0,1,1,0]],[[0,0.25,0.5,0.25,1,0],1],[[0,0,1,0],1],[[0,"#ea7d7d",1,"#dfa5c7"]],0,[0,0],null,[0,0],[0,0],10,0,0,[1.9,2.3],1,0.04,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticleGroupsPreset["fw_kikus"] = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0.05 0.65 0 1 0"],"targetType":0,
    "comment":"花火~菊(小)[橙]"};
$dataTrpParticleGroupsPreset["fw_kikus_yellow/h"] = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0.05 0.65 0 1 0"],"targetType":0,
    "comment":"花火~菊(小)[黄]"};
$dataTrpParticleGroupsPreset["fw_kikus_green/h"] = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0.05 0.65 0 1 0"],"targetType":0,
    "comment":"花火~菊(小)[緑]"};
$dataTrpParticleGroupsPreset["fw_kikus_blue/h"] = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0.05 0.65 0 1 0"],"targetType":0,
    "comment":"花火~菊(小)[青]"};
$dataTrpParticleGroupsPreset["fw_kikus_purple/h"] = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0.05 0.65 0 1 0"],"targetType":0,
    "comment":"花火~菊(小)[紫]"};
$dataTrpParticleGroupsPreset["fw_kikus_red/h"] = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0.05 0.65 0 1 0"],"targetType":0,
    "comment":"花火~菊(小)[赤]"};

//fw_twin
$dataTrpParticlePreset["_auto:0:fw_twin/h"] = [4,[[0,2,0.11,1,0.5,1,1,0]],[[0,2.5,0.15,1,0.5,0.1,1,0],1],[[0,2000,0.2,450,0.5,100,1,10],0.9],[[0,"#ff9989",1,"#ffe2ca"]],0,[0,0],null,[-120,-110],[50,-50],0,0,0,[1.3,1.5],1,0.01,1,2,0.011,10000,[0,0],4,[0,0],[20,-100,0,0,0,0,0],0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_twin_yellow/h"] = [4,[[0,2,0.11,1,0.5,1,1,0]],[[0,2.5,0.15,1,0.5,0.1,1,0],1],[[0,2000,0.2,450,0.5,100,1,10],0.9],[[0,"#f8dd73",1,"#ffe2ca"]],0,[0,0],null,[-120,-110],[50,-50],0,0,0,[1.3,1.5],1,0.01,1,2,0.011,10000,[0,0],4,[0,0],[20,-100,0,0,0,0,0],0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_twin_green/h"] = [4,[[0,2,0.11,1,0.5,1,1,0]],[[0,2.5,0.15,1,0.5,0.1,1,0],1],[[0,2000,0.2,450,0.5,100,1,10],0.9],[[0,"#48ef49",1,"#ceffca"]],0,[0,0],null,[-120,-110],[50,-50],0,0,0,[1.3,1.5],1,0.01,1,2,0.011,10000,[0,0],4,[0,0],[20,-100,0,0,0,0,0],0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_twin_blue/h"] = [4,[[0,2,0.11,1,0.5,1,1,0]],[[0,2.5,0.15,1,0.5,0.1,1,0],1],[[0,2000,0.2,450,0.5,100,1,10],0.9],[[0,"#739bf8",1,"#cae5ff"]],0,[0,0],null,[-120,-110],[50,-50],0,0,0,[1.3,1.5],1,0.01,1,2,0.011,10000,[0,0],4,[0,0],[20,-100,0,0,0,0,0],0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_twin_purple/h"] = [4,[[0,2,0.11,1,0.5,1,1,0]],[[0,2.5,0.15,1,0.5,0.1,1,0],1],[[0,2000,0.2,450,0.5,100,1,10],0.9],[[0,"#8548ef",1,"#ddcaff"]],0,[0,0],null,[-120,-110],[50,-50],0,0,0,[1.3,1.5],1,0.01,1,2,0.011,10000,[0,0],4,[0,0],[20,-100,0,0,0,0,0],0,0,"particle8",0,""]
$dataTrpParticlePreset["_auto:0:fw_twin_red/h"] = [4,[[0,2,0.11,1,0.5,1,1,0]],[[0,2.5,0.15,1,0.5,0.1,1,0],1],[[0,2000,0.2,450,0.5,100,1,10],0.9],[[0,"#f69a9a",1,"#ffcae5"]],0,[0,0],null,[-120,-110],[50,-50],0,0,0,[1.3,1.5],1,0.01,1,2,0.011,10000,[0,0],4,[0,0],[20,-100,0,0,0,0,0],0,0,"particle8",0,""]
$dataTrpParticlePreset["_sub:0:fw_twin/h"] = [4,[[0,1,1,0]],[[0,0.2,0.5,0.2,1,0],1],[[0,30,1,0],1],[[0,"#f6857f",1,"#ffffff"]],0,[0,4],null,[0,0],[0,0],10,0,0,[0.8,1],1,0.005,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_twin_yellow/h"] = [4,[[0,1,1,0]],[[0,0.2,0.5,0.2,1,0],1],[[0,30,1,0],1],[[0,"#edb350",1,"#f3d4a0"]],0,[0,4],null,[0,0],[0,0],10,0,0,[0.8,1],1,0.005,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_twin_green/h"] = [4,[[0,1,1,0]],[[0,0.2,0.5,0.2,1,0],1],[[0,30,1,0],1],[[0,"#62ed50",1,"#a8e8b1"]],0,[0,4],null,[0,0],[0,0],10,0,0,[0.8,1],1,0.005,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_twin_blue/h"] = [4,[[0,1,1,0]],[[0,0.2,0.5,0.2,1,0],1],[[0,30,1,0],1],[[0,"#4c5ffb",1,"#c8cffb"]],0,[0,4],null,[0,0],[0,0],10,0,0,[0.8,1],1,0.005,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_twin_purple/h"] = [4,[[0,1,1,0]],[[0,0.2,0.5,0.2,1,0],1],[[0,30,1,0],1],[[0,"#7e4cfb",1,"#d0c8fb"]],0,[0,4],null,[0,0],[0,0],10,0,0,[0.8,1],1,0.005,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticlePreset["_sub:0:fw_twin_red/h"] = [4,[[0,1,1,0]],[[0,0.2,0.5,0.2,1,0],1],[[0,30,1,0],1],[[0,"#ff5999",1,"#ff9b9b"]],0,[0,4],null,[0,0],[0,0],10,0,0,[0.8,1],1,0.005,1,1,-1,10000,[0,0],0,[0,0],null,0,0,"flame1g",0,""]
$dataTrpParticleGroupsPreset["fw_twin"] = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0 0.5 0 1 0"],"targetType":0,
    "comment":"花火~V字噴出[橙]"};
$dataTrpParticleGroupsPreset["fw_twin_yellow/h"] = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0 0.5 0 1 0"],"targetType":0,
    "comment":"花火~V字噴出[黄]"};
$dataTrpParticleGroupsPreset["fw_twin_green/h"] = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0 0.5 0 1 0"],"targetType":0,
    "comment":"花火~V字噴出[緑]"};
$dataTrpParticleGroupsPreset["fw_twin_blue/h"] = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0 0.5 0 1 0"],"targetType":0,
    "comment":"花火~V字噴出[青]"};
$dataTrpParticleGroupsPreset["fw_twin_purple/h"] = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0 0.5 0 1 0"],"targetType":0,
    "comment":"花火~V字噴出[紫]"};
$dataTrpParticleGroupsPreset["fw_twin_red/h"] = {"repeat":-1,"list":["set _auto:0 target def back","sub set _auto:0 _sub:0 0 0.5 0 1 0"],"targetType":0,
    "comment":"花火~V字噴出[赤]"};

})();