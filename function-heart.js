var c = document.getElementsByTagName('canvas')[0];
var a = c.getContext('2d');
c.width = window.innerWidth;
c.height = window.innerHeight;

var h = [], e = [], v = 32, M = Math, R = M.random, C = M.cos, Y = 6.3;
for (var i = 0; i < Y; i += 0.2) {
    h.push([
        c.width / 2 + 180 * M.pow(M.sin(i), 3),
        c.height / 2 + 10 * (-(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i)))
    ]);
}

i = 0;
while (i < v) {
    var x = R() * c.width;
    var y = R() * c.height;
    var H = i / v * 80 + 280;
    var S = R() * 40 + 60;
    var B = R() * 60 + 20;
    var f = [];

    var k = 0;
    while (k < v) {
        f[k++] = {
            x: x,
            y: y,
            X: 0,
            Y: 0,
            R: (1 - k / v) + 1,
            S: R() + 1,
            q: ~~(R() * v),
            D: i % 2 * 2 - 1,
            F: R() * 0.2 + 0.7,
            f: "hsla(" + ~H + "," + S + "%," + ~B + "%,.1)"
        };
    }
    e[i++] = f;
}

function render(_) {
    a.fillStyle = _.f;
    a.beginPath();
    a.arc(_.x, _.y, _.R, 0, Y, 1);
    a.closePath();
    a.fill();
}

function loop() {
    a.fillStyle = "rgba(0,0,0,.2)";
    a.fillRect(0, 0, c.width, c.height);

    i = v;
    while (i--) {
        var f = e[i];
        var u = f[0];
        var q = h[u.q];
        var D = u.x - q[0];
        var E = u.y - q[1];
        var G = M.sqrt((D * D) + (E * E));

        if (G < 10) {
            if (R() > 0.95) {
                u.q = ~~(R() * v);
            } else {
                if (R() > 0.99) u.D *= -1;
                u.q += u.D;
                u.q %= v;
                if (u.q < 0) u.q += v;
            }
        }

        u.X += -D / G * u.S;
        u.Y += -E / G * u.S;
        u.x += u.X;
        u.y += u.Y;
        render(u);
        u.X *= u.F;
        u.Y *= u.F;

        k = 0;
        while (k < v - 1) {
            var T = f[k];
            var N = f[++k];
            N.x -= (N.x - T.x) * 0.7;
            N.y -= (N.y - T.y) * 0.7;
            render(N);
        }
    }
}

(function animate() {
    requestAnimationFrame(animate);
    loop();
})();
