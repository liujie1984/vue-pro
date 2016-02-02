var App = Vue.extend({});
var router = new VueRouter();
var Foo = Vue.extend({
    template: '<p>This is foo!</p>'
})

var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
})
router.map({
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    }
});

// start app

router.start(App, '#app');