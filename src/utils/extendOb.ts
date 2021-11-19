export default function extend(_a: object, _b: object, remove?: boolean) {
    remove = remove === undefined ? false : remove;
    let a_traversed: any[] = [];
    let b_traversed: any[] = [];

    function _extend (a: any, b: any) {
        if (a_traversed.indexOf(a) == -1 && b_traversed.indexOf(b) == -1) {
            a_traversed.push(a);
            b_traversed.push(b);

            if (a instanceof Array) {
                for (var i = 0; i < b.length; i++) a[i] = a[i] ? _extend(a[i], b[i]) : b[i];
                if (remove && b.length < a.length) a.splice(b.length, a.length - b.length);
            } else if (a instanceof Object) {
                for (var x in b) a[x] = a.hasOwnProperty(x) ? _extend(a[x], b[x]) : b[x];

                if (remove)
                    for (var x in a) {
                        if (!b.hasOwnProperty(x)) delete a[x];
                    }
            } else return b;
            
            return a;
        }
    }

    _extend(_a, _b);
}
