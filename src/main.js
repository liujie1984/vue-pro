import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueTouch);
Vue.config.debug = true;

var App = Vue.extend({});
var router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});

router.map({
    '/':{				//首页-推荐
        name:'recommend',
        component:require('./views/recommend.vue')
    },
    '/recommend':{				//首页-推荐
        name:'recommend',
        component:require('./views/recommend.vue')
    },
    /* 404路由 */
    '*': {
        component: require('./views/recommend.vue')
    },
    '/image':{               //图片
        name:'image',
        component:require('./views/image.vue')
    },
    '/video':{               //视频
        name:'video',
        component:require('./views/video.vue')
    },
    '/focus':{               //视频
        name:'focus',
        component:require('./views/focus.vue')
    },
    '/tutorial':{               //视频
        name:'tutorial',
        component:require('./views/tutorial.vue')
    },
    '/review':{               //视频
        name:'review',
        component:require('./views/review.vue')
    }

    //'/topic/:id':{               //专题
    //    name:'topic',
    //    component:require('./views/topic.vue')
    //},
    //'/add':{               //首页
    //    name:'add',
    //    component:require('./views/new.vue'),
    //    auth: true
    //},
    //'/message':{               //消息
    //    name:'message',
    //    component:require('./views/message.vue'),
    //    auth: true
    //}
    //'/about':{               //关于
    //    name:'about',
    //    component:require('./views/about.vue')
    //},
    //'/login':{               //登录
    //    name:'login',
    //    component:require('./views/login.vue')
    //},
    //'/user/:loginname':{               //用户信息
    //    name:'user',
    //    component:require('./views/user.vue')
    //}
});
// start app
router.start(App, '#app');