import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueTouch);
Vue.config.debug = true;

var App = Vue.extend({
    data:function(){
        return {
            navNum:0,
        }
    },
    created:function() {
        console.dir(location);
        if (location.href.indexOf('fabu') > 0){
            localStorage.setItem('apphost','http://mapi.52hangpai.cn/');
        }
        if (location.href.indexOf('t-fabiao') > 0) {
            localStorage.setItem('apphost','http://alpha.52hangpai.cn/');
        }
        if (location.href.indexOf('localhost') > 0) {
            localStorage.setItem('apphost','http://localhost:8080/');
        }
    },
    methods:{
        onSwipe: function (e) {
            var names = ['recommend','image','video','focus','mix/tutorial','mix/review'];
            let namesLength = names.length;
            if(e.deltaX>100){
                this.navNum++;
                if(this.navNum >= namesLength){
                    this.navNum = 0;
                }
                let route = names[this.navNum].split("/");

                router.go({ name: route[0],params: { type: route[1] }});
            }else if(e.deltaX<-100){
                this.navNum--;
                if(this.navNum<0){
                    this.navNum = namesLength-1;
                }
                let route = names[this.navNum].split("/");

                router.replace({ name: route[0],params: { type: route[1] }});
            }
            console.dir(e.deltaX);
        }
    }
});
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
    '/mix/:type':{               //视频
        name:'mix',
        component:require('./views/mix.vue')
    },
    '/mix-more/:type':{               //视频
        name:'mix-more',
        component:require('./views/mix-more.vue')
    },
    '/works-detail/:id':{               //视频
        name:'works-detail',
        component:require('./views/works-detail.vue')
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