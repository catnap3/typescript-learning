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