import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueTouch);
Vue.config.debug = true;
//request headers
Vue.http.headers.common['App-Ver'] = '2.1';
Vue.http.headers.common['Device-Id'] = '1';
Vue.http.headers.common['Os'] = 'web';
Vue.http.headers.common['Os-Ver'] = '2.1.1';
Vue.http.headers.common['Screen'] = '320*480';
Vue.http.headers.common['User-Token'] = '0';
Vue.http.headers.common['Network'] = '0';
// Vue.http.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.http.options.emulateJSON = true;
// console.dir(Vue.http);
var App = Vue.extend({
    data:function(){
        return {
            navNum:0,
            msg:'login',
        }
    },
    ready:function() {
        // console.dir(location);
        if (location.href.indexOf('fabu') > 0){
            localStorage.setItem('apphost','http://mapi.52hangpai.cn/');
        }
        if (location.href.indexOf('t-fabiao') > 0) {
            localStorage.setItem('apphost','http://alpha.52hangpai.cn/');
        }
        if (location.href.indexOf('localhost') > 0) {
            localStorage.setItem('apphost','http://localhost:8080/');
        }
         // console.dir(this.getCookie('user_info'));
        if(this.getCookie('user_info')!=null&&this.getCookie('user_info')!=''&&this.getCookie('user_info')!=undefined) {
            let userInfo = JSON.parse(decodeURIComponent(this.getCookie('user_info')));
            sessionStorage.setItem('userId',userInfo.data.user_id);
            sessionStorage.setItem('userData',decodeURIComponent(JSON.stringify(userInfo.data)));
            // this.thirdPartyLogin();
            // Vue.http.headers.common['User-Token'] = userInfo.data.token;
            // this.clearCookie('userData');
        }
        // console.dir(JSON.parse(decodeURIComponent(this.getCookie('user_info'))));

    },
    methods:{
        getCookie: function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        },
        clearCookie: function(name) {  
            this.setCookie(name, "", -1);  
        },
        thirdPartyLogin: function () {
            console.dir('thirdPartyLogin');
            console.dir(this.msg);
            this.$broadcast('third-party-login-msg',this.msg);
        },
    },
});
var router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true,
    // linkActiveClass:,
});

//登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach(transition => {
    if (transition.to.auth) {
        if (sessionStorage.userId) {
            transition.next();
        } else {
            var redirect = encodeURIComponent(transition.to.path);
            transition.redirect('/login?redirect=' + redirect);
        }
    } else {
        transition.next();
    }
});

router.map({
    /* 404路由 */
    // '*': {
    //     component: require('./views/recommend.vue')
    // },
    '/':{				
        name:'recommend',
        component:require('./views/recommend.vue')
    },
    //广场square
    '/square':{              
        name:'recommend',
        component:require('./views/recommend.vue')
    },
    '/square/recommend':{				
        name:'recommend',
        component:require('./views/recommend.vue')
    },
    '/square/works-more/:type':{               
        name:'works-more',
        component:require('./views/works-more.vue')
    },
    '/square/focus':{               
        name:'focus',
        component:require('./views/focus.vue'),
        auth: true,
    },
    '/square/mix/:type':{               
        name:'mix',
        component:require('./views/mix.vue')
    },
    '/square/mix-more/:type':{               
        name:'mix-more',
        component:require('./views/mix-more.vue')
    },
    '/works-detail/:id':{               
        name:'works-detail',
        component:require('./views/works-detail.vue')
    },
    '/community':{              
        name:'community',
        component:require('./views/community.vue')
    },
    '/community-more/:id':{              
        name:'community-more',
        component:require('./views/community-more.vue')
    },
    '/login':{               
        name:'login',
        component:require('./views/login.vue')
    },
    '/person':{               
        name:'person',
        component:require('./views/person.vue'),
        auth: true,
    },
    '/person/:id':{               
        name:'person-other',
        component:require('./views/person.vue'),
    },
    '/message':{               
        name:'message',
        component:require('./views/message.vue')
    },
    '/message/like-list':{               
        name:'message-like-list',
        component:require('./views/message-like-list.vue'),
        auth: true,
    },
    '/message/comment-list':{               
        name:'message-comment-list',
        component:require('./views/message-comment-list.vue'),
        auth: true,
    },
    '/message/follow-list':{               
        name:'message-follow-list',
        component:require('./views/message-follow-list.vue'),
        auth: true,
    },
    '/message/chat-list':{               
        name:'message-chat-list',
        component:require('./views/message-chat-list.vue'),
        auth: true,
    },
    '/message/systeminfo-list':{               
        name:'message-systeminfo-list',
        component:require('./views/message-systeminfo-list.vue'),
        auth: true,
    },
    // '/register':{               
    //     name:'register',
    //     component:require('./views/register.vue')
    // },
    // '/reset-password':{               
    //     name:'reset-password',
    //     component:require('./views/reset-password.vue')
    // }

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