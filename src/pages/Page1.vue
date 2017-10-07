<template>
    <div class="page1">
        <div class="send">
            <div class="input">
                <input type="text" v-model="msg" @keyup.enter="send">
                <a @click="send" href="javascript:;">发送</a>
            </div>
            <a class="new" @click="open" href="javascript:;">+ 新建窗口</a>
        </div>

        <!-- <div class="receive">
            <iframe src="/#/2" frameborder="0"></iframe>
        </div> -->

        <div class="receive">
            <ul>
                <template v-for="item in msgList">
                    <li v-if="item.sender == 'parent'">父页面：{{item.msg}}</li>
                    <li v-else>子页面：{{item.msg}}</li>
                </template>
                <li class="toView"></li>
            </ul>
        </div>
    </div>
</template>

<script>

let HOST = 'http://localhost:8080/',
    rows = 0,
    cols = 0;

export default {
    data () {
        return {
            msg: '',
            msgList: [],
            childWins: []
        }
    },

    watch: {
        msgList () {
            let $toView = document.querySelector('.toView');
            $toView.scrollIntoView();
        }
    },

    methods: {
        send () {
            if(this.msg == '') { return; }
            let msgObj = {
                msg: this.msg,
                sender: 'parent'
            };
            this.msgList.push(msgObj);
            for(let i = 0, len = this.childWins.length; i < len; i ++) {
                this.childWins[i].postMessage(JSON.stringify(msgObj), HOST);
            }
            this.msg = '';
        },

        open () {
            let newWin = window.open('/#/2', '_blank', 'width=300,height=400,top=' + (10 + cols * 400) + ',left=' + (10 + rows * 300));
            this.childWins.push(newWin);
            cols ++;
            if(cols % 2 == 0) {
                rows ++;
                cols = 0;
            }
        }
    },

    mounted () {
         window.addEventListener('message', e => {
            let msgObj = JSON.parse(e.data);
            this.msgList.push(msgObj);
        }, false);
    }
}
</script>

<style scoped lang="less">
    .send,
    .receive {
        width: 300px;
        margin: 20px auto;
    }
    .send {
        text-align: center;
        input,
        a {
            display: inline-block;
            height: 100%;
            vertical-align: middle;
            font-size: 14px;
            text-decoration: none;
            outline: none;
        }
        .input {
            height: 40px;
            font-size: 0;
            input {
                width: 240px;
                border: 1px solid #aaa;
                border-right: none;
                padding: 5px;
            }
            a {
                width: 60px;
                text-align: center;
                line-height: 40px;
                background-color: #4ab173;
                color: #fff;
                &:hover {
                    background-color: #207b45;
                }
            }
        }
        a.new {
            background-color: #4ab173;
            height: 40px;
            line-height: 40px;
            color: #fff;
            width: 100%;
            margin-top: 10px;
            &:hover {
                background-color: #207b45;
            }
        }
    }
    .receive {
        height: 250px;
        border: 1px solid #aaa;
        overflow: auto;
        padding: 10px;
        iframe {
            height: 100%;
        }
        ul {
            li {
                list-style: none;
            }
        }
        .toView {
            position: relative;
            height: .5rem;
            margin-top: .5rem;
        }
    }
</style>


