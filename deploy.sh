
set -e

# https://en.wikipedia.org/wiki/ANSI_escape_code
lgreen='\033[1;32m'
yellow='\033[1;33m'
norm='\033[0m'
bold='\033[1m'

unameOut="$(uname -s)"
case "${unameOut}" in
  Linux*)     machine=Linux;;
  Darwin*)    machine=Mac;;
  CYGWIN*)    machine=Cygwin;;
  MINGW*)     machine=MinGw;;
  *)          machine="UNKNOWN:${unameOut}"
esac

if [ ${machine} = "Mac" ]
then
  osStatus=""
elif [ ${machine} = "MinGw" ]
then
  osStatus="-e"
else
  osStatus=""
fi

echo
echo ${osStatus} "${lgreen}=============================================================="
echo ${osStatus} " 您的執行環境是 ${machine} "
echo ${osStatus} "==============================================================${norm}"

echo
echo ${osStatus} "${lgreen}=============================================================="
echo ${osStatus} " 一鍵部署 5 秒後開始運作 "
echo ${osStatus} " ＊如要停止動作請按下 CRTL + C or Control + C"
echo ${osStatus} "==============================================================${norm}"

# sleep 5s

echo
echo ${osStatus} "${yellow}=============================================================="
echo ${osStatus} " 準備取得 Git 遠端 Url..."
echo ${osStatus} "==============================================================${norm}"

# sleep 1s
originUrl=$(git config --get remote.origin.url)

echo
echo ${osStatus} "${lgreen}=============================================================="
echo ${osStatus} " 目前遠端分支: ${originUrl} "
echo ${osStatus} "==============================================================${norm}"

sleep 1s
split=${originUrl:0:5}
status='';
if [ $split = 'https' ]
then
  status='HTTPS'
else
  status='SSH'
fi

echo
echo ${osStatus} "${lgreen}=============================================================="
echo ${osStatus} " 傳輸方式將採用 $status "
echo ${osStatus} " 目前遠端分支 URL：$originUrl "
echo ${osStatus} "==============================================================${norm}"

# sleep 5s

echo
echo ${osStatus} "${yellow}=============================================================="
echo ${osStatus} " 判斷是否已存在 vue.config.js"
echo ${osStatus} "==============================================================${norm}"

work_path="$(dirname $0)/vue.config.js";
if [ ! -e "$work_path" ]
then

echo
echo ${osStatus} "${yellow}=============================================================="
echo ${osStatus} " vue.config.js 不存在 "
echo ${osStatus} " 將於五秒後建立 vue.config.js "
echo ${osStatus} " ＊如要停止動作請按下 CRTL + C or Control + C"
echo ${osStatus} "==============================================================${norm}"

sleep 5s

touch $work_path

echo
echo ${osStatus} "${lgreen}=============================================================="
echo ${osStatus} " 五秒後開始寫入 Vue Cli 編譯後的路徑 "
echo ${osStatus} " publicPath 路徑是 「./」 "
echo ${osStatus} " 詳細可見該檔案下註解。 "
echo ${osStatus} " ＊如要停止動作請按下 CRTL + C or Control + C"
echo ${osStatus} "==============================================================${norm}"

sleep 5s

echo "// 該檔案生成的方式可以在 Vue Ui 中的「設定」->「Vue Cli」->「公開路徑」找到。
module.exports = {
  // 預設狀況下，部署到 GitHub Pages 可能會無法顯示畫面
  // 因此需要多設置該屬性
  // 官方文件：https://cli.vuejs.org/zh/config/#publicpath
  publicPath: './artion_frontend/',
};">$work_path

else

echo
echo ${osStatus} "${lgreen}=============================================================="
echo ${osStatus} " 目前已存在 vue.config.js"
echo ${osStatus} " 準備開始進入編譯 Vue Cli 階段"
echo ${osStatus} "==============================================================${norm}"

fi

echo
echo ${osStatus} "${yellow}=============================================================="
echo ${osStatus} " 5 秒後開始編譯 Vue Cli "
echo ${osStatus} " ＊如要停止動作請按下 CRTL + C or Control + C"
echo ${osStatus} "==============================================================${norm}"

sleep 5s
npm run build

echo
echo ${osStatus} "${lgreen}=============================================================="
echo ${osStatus} " 編譯完成 "
echo ${osStatus} "==============================================================${norm}"

echo
echo ${osStatus} "${yellow}=============================================================="
echo ${osStatus} " 移動到編譯完成的資料夾 "
echo ${osStatus} "==============================================================${norm}"

cd dist

echo
echo ${osStatus} "${yellow}=============================================================="
echo ${osStatus} " 初始化 Git 與加入 Commit "
echo ${osStatus} "==============================================================${norm}"

git init
git add .
git commit -m "update `date +'%Y-%m-%d %H:%M:%S'`";

echo
echo ${osStatus} "${yellow}=============================================================="
echo ${osStatus} " 5 秒後部署檔案到遠端分支 "
echo ${osStatus} " ＊如要停止動作請按下 CRTL + C or Control + C"
echo ${osStatus} "==============================================================${norm}"
sleep 5s
git push -f $originUrl master:gh-pages

echo
echo ${osStatus} "${yellow}=============================================================="
echo ${osStatus} " 部署完成 "
echo ${osStatus} "==============================================================${norm}"

echo
echo ${osStatus} "${lgreen}=============================================================="
echo ${osStatus} " 一鍵部署指令結束 "
echo ${osStatus} "==============================================================${norm}"





# #!/usr/bin/env sh

# # 發生錯誤時執行終止指令
# set -e

# # 打包編譯
# npm run build

# # 移動到打包資料夾下，若你有調整的話打包後的資料夾請務必調整
# cd dist

# # 部署到自定義網域
# # echo 'www.example.com' > CNAME

# git init
# git add -A
# git commit -m 'deploy'

# # 部署到 https://<USERNAME>.github.io
# # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# # 部署到 https://<USERNAME>.github.io/<REPO>
# # git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# # 以這個專案來講就要改成這樣以下這樣，下面是走 ssh 模式
# git push -f git@github.com:williamafil/artion_frontend.git master:gh-pages
# # 除此之外，也可以改走 HTTPS 模式
# # git push -f https://github.com/hsiangfeng/HexfootMusic.git master:gh-pages

# cd -