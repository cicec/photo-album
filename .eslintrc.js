module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "mocha": true
    },
    "globals": {
        "Babel": true,
        "React": true
    },
    "plugins": [
        "react"
    ],
    "rules": {
        //  JSX文件拓展名
        "react/jsx-filename-extension": "off",
        //  JSX缩进
        "react/jsx-indent": "off",
        //  JSX属性缩进
        "react/jsx-indent-props": "off",
        //  强制使用一致的缩进
        "indent": ["error", 4, { "SwitchCase": 1 }],
        //  强制使用一致的换行符风格
        "linebreak-style": "off",
        //  要求或禁止文件末尾保留一行空行
        "eol-last": ["error", "never"],
        //  强制行的最大长度
        "max-len": ["error", 1000],
        //  要求箭头函数的参数使用圆括号
        "arrow-parens": [2, "as-needed", { "requireForBlockBody": true }],
        //  强制在花括号内使用一致的换行符
        "object-curly-newline": "off",
        //  要求或禁止使用拖尾逗号
        "comma-dangle": ["error", "only-multiline"],
        //  要求或禁止使用分号代替 ASI
        "semi": ["error", "never"],
        //  禁止使用一元操作符 ++ 和 --
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        //  禁止对函数参数再赋值
        "no-param-reassign": "off",
        //  禁止循环中存在函数
        "no-loop-func": "off",
        //  禁止new操作符的副作用
        "no-new": "off",
        //  禁止赋值运算符出现在条件语句中
        "no-cond-assign": "off",
        //  强制在类的方法内使用this
        "class-methods-use-this": "off",
        //  推荐无状态组件使用函数
        "react/prefer-stateless-function": "off",
        //  强制对prop使用类型检查
        "react/prop-types": "off"
    }
};