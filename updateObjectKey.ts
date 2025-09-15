// このファイルの目的
// スプレッド構文でオブジェクトをコピーしてプロパティを上書きしても、型チェックを厳密にしてくれない事象の考察

interface Obj{
a: "foo" | "bar";  // ここで、a は foo または bar でなければならないと定義している。
b: string;
c: string;
}

function m(
    obj: Obj,
    key:keyof Obj,
    value: string  // key が "a" でも "b" でも "c" でも、ただの文字列なら何でも入ってしまう。
    // だから "a" に "baz" を渡しても 型エラーにならず、"foo" | "bar" の制約がすり抜けてしまう。
):

Obj{
return {...obj, [key]: value}  // この ...obj という形式をスプレッド構文と呼ぶらしい
};

const bad: Obj = m({
    a: "foo",
    b: "",
    c: ""
    },
    "a", "baz"
);

console.log(bad.a);  // "baz"

// 解決策
// ------------------------------------------------------------------
// function m<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
// return { ...obj, [key]: value };
// }
// ------------------------------------------------------------------
// K をジェネリックに追加し、key と value をペアで縛る
// value の型は T[K] になるので、
// ・key = "a" → value は "foo" | "bar"
// ・key = "b" → value は string
// と正しく対応する。
// これなら "a" に "baz" を入れた場合コンパイルエラーになる。