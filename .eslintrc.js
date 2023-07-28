module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2019,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ["vue", "@typescript-eslint"],
    extends: [
        "plugin:@typescript-eslint/recommended",
    // "airbnb-typescript/base",
        "plugin:vue/recommended",
        "eslint:recommended"
    ],

    rules: {
    /* "@typescript-eslint/rule-name": "error",
           recommend at least one newline at the end of files */
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "prefer-const": "off",
        "no-var": "error",
        "@typescript-eslint/no-inferrable-types": "off",
        "eol-last": 0,
    // enforce consistent indentation with 4 space
        indent: "off",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "interface",
                format: ["PascalCase"]
        /* "custom": {
               "regex": "^I[A-Z]",
               "match": true
           } */
            }
        ],
        "indent-legacy": [
            "error",
      // eslint-disable-next-line no-magic-numbers
            4,
            {
                SwitchCase: 1
            }
        ],
    // require default cases in switch statements
        "default-case": "error",
    //requires all immediately-invoked function expressions to be wrapped in parentheses
        "wrap-iife": ["error", "outside"],
    //ariable name.If ESLint decides that the variable is a constant (all uppercase), then no warning will be thrown
        camelcase: [
            "warn",
            {
                properties: "always"
            }
        ],
        "@typescript-eslint/camelcase": ["off"],

        "lines-around-comment": [
            "error",
            {
                beforeBlockComment: false,
                beforeLineComment: false
            }
        ],
        "one-var": [
            "error",
            {
                initialized: "never", //既声明变量又对变量赋值
                uninitialized: "always" //只声明变量不对变量赋值
            }
        ],

    //enforce consistent spacing before and after keywords
        "keyword-spacing": [
            "error",
            {
                after: true
            }
        ],
    //enforce consistent spacing before and after commas
        "comma-spacing": [
            "error",
            {
                before: false,
                after: true
            }
        ],
    //t recommend gaps between the function identifier and application
        "no-spaced-func": "error",
        "space-in-parens": ["error", "never"],
        "no-multi-spaces": ["error", { ignoreEOLComments: true }],
    //require semicolons at the end of statements
        semi: ["error", "never"],
    //disallows unnecessary semicolons
        "no-extra-semi": "error",
        "linebreak-style": "off",
    //enforce spacing around a semicolon
        "semi-spacing": [
            "error",
            {
                before: false,
                after: true
            }
        ],
    // 'no-console': ['error', { allow: ['warn', 'error'] }],
        "standard/computed-property-even-spacing": 0,

        "space-before-function-paren": ["error", "always"],
        "no-unused-vars": ["warn"],
        "vue/max-attributes-per-line": [
            "error",
            {
                singleline: {
                    max: 5
                },
                multiline: {
                    max: 5
                }
            }
        ],
        "constructor-super": "error",
    // 在 getter 中强制执行“return”语句
        "getter-return": "error",
    // 禁止循环内的“等待”
        "no-await-in-loop": "error",
    // 禁止条件表达式中的赋值运算符
        "no-cond-assign": "error",
    // 禁止在“函数”定义中出现重复参数
        "no-dupe-args": "error",
        "no-dupe-class-members": "error",
        "no-dupe-keys": "error",
        "no-fallthrough": "error",
        "no-irregular-whitespace": ["error", { skipComments: true }],
        "no-self-assign": ["error", { props: true }],
    /* "no-unsafe-optional-chaining": "error",
       箭头函数体周围需要大括号 */
        "arrow-body-style": [
            "error",
            "as-needed",
            {
                requireReturnForObjectLiteral: true
            }
        ],
        "valid-typeof": "error",
        "dot-notation": "error",
        "multiline-comment-style": ["error", "bare-block"],
    /* "no-confusing-arrow": [
           "error",
           { "allowParens": true, "onlyOneSimpleParam": false }
       ], */
        "no-extra-boolean-cast": "error",
        "no-lonely-if": "error",
    // 禁止在循环语句中包含不安全引用的函数声明
        "no-loop-func": "error",
        "no-mixed-operators": [
            "error",
            {
                groups: [
          ["+", "-", "*", "/", "%", "**"],
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"]
                ],
                allowSamePrecedence: true
            }
        ],
    /*  禁止使用魔法数字
            "no-magic-numbers": [
                "error",
                {
                    "ignoreArrayIndexes": true
                }
            ] */
    // 禁止嵌套三元表达式
        "no-nested-ternary": "error",
    // 在数组括号内强制执行一致的间距
        "array-bracket-spacing": ["error", "never"],
    // 需要在箭头函数参数周围加上括号
        "arrow-parens": ["error", "always"],
    // 在箭头函数中强制箭头前后的间距一致
        "arrow-spacing": "error",
    // 在打开块之后和关闭块之前禁止或强制块内的空格
        "block-spacing": "error",
    // 对块强制使用一致的大括号样式
        "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    // 要求或不允许尾随逗号
        "comma-dangle": ["error", "never"],
    // 在计算的属性括号内强制执行一致的间距
        "computed-property-spacing": ["error", "never"],
        "dot-location": ["error", "property"],
    /* 箭头函数前后间距
       "arrow-spacing": ["error", { before: true, after: true }],
       确保中缀运算符周围有空格 */
        "space-infix-ops": ["error", { int32Hint: false }]
    }
}
