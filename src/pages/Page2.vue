<template>
    <div class="page2">
        <ul>
            <template v-for="item in msgList">
                <li v-if="item.sender == 'parent'">父页面：{{item.msg}}</li>
                <li v-else>子页面：{{item.msg}}</li>
            </template>
        </ul>
        <div class="send">
            <div class="input">
                <input type="text" v-model="msg" @keyup.enter="send">
                <a @click="send" href="javascript:;">发送</a>
            </div>
        </div>
    </div>
</template>

<script>
let HOST = 'http://localhost:8080/';

export default {
    data () {
        return {
            msg: '',
            msgList: []
        }
    },

    methods: {
        send () {
            let msgObj = {
                msg: this.msg,
                sender: 'son'
            };
            this.msgList.push(msgObj);
            window.opener.postMessage(JSON.stringify(msgObj), HOST);
            this.msg = '';
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
    .send {
        width: 300px;
        margin: 20px auto;
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
    }
</style>


