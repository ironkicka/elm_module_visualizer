const fs = require("fs");

function fileExists(filename) {
    try {
        fileContents = fs.statSync(filename, "utf-8");
        return true
    } catch (err) {
        return false
    }
}

const dirPath = "xxxxx"

//親玉モジュールであるApp.elmを読む
function exploreModule(moduleName) {
    const moduleFileContent = fs.readFileSync(dirPath + moduleName, "utf-8");
    const lines = moduleFileContent.split('\n');//改行ごとに分割
    let children = []
    const fuga = lines.forEach(item => {
        if (item.indexOf('import') == 0) {
            let line = item.split(" ")
            const subModuleName = line[1].replace(".", "/") + ".elm"
            fileExists(dirPath + subModuleName);
            //ローカルモジュール，標準モジュールの両方が出てくる
            //ローカルモジュールのときのみ再帰的に処理を行う．
            if (fileExists(dirPath + subModuleName)) {
                children.push(exploreModule(subModuleName))
            } else {//標準モジュールのときはそれ以上探索しない．
                //children.push({ "name": subModuleName, "childrend": "External" })
            }

        }
    })
    let imports = {}
    imports["name"] = moduleName
    imports["children"] = children
    return imports
}

const result = exploreModule("Main.elm")
//Objectのままだとコンソール上で省略表記されてしまうため，Stringに変換
console.log(JSON.stringify(result, null, '\t'));

//ファイルに書き出し
try {
    fs.writeFileSync("tree.json", JSON.stringify(result));
    console.log('write end');
} catch (e) {
    console.log(e);
}
