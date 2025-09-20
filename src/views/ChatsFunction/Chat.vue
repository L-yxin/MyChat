<template>
    <el-container class="ep-container">
        <el-aside class="chats"></el-aside>
        <el-container class="chat-window">
            <el-header class="chat-header">
                <el-aside class="chat-avatar">
                    <el-image src="https://picsum.photos/50/50" fit="cover" alt="头像"></el-image>
                    <p>UserName</p>
                </el-aside>
                <el-main class="top-right"></el-main>
            </el-header>
            <el-main class="chat-main">
            </el-main>
            <el-footer class="chat-footer">
                <quill-text v-model="text"></quill-text>
            </el-footer>
        </el-container>
    </el-container>
</template>
<script setup>
const text = ref(null)



</script>
<style scoped>
.chats {
    background-color: #e7e7e7;
    width: 250px;
    border-right: 1px solid #949494;
}

.chat-header {
    background-color: #e7e7e7;
    border-bottom: 1px solid #949494;
    display: flex;
    align-items: center;
}

.chat-main {
    background-color: #ffffff;
    border-bottom: 1px solid #949494;
}

.chat-footer {
    background-color: #e7e7e7;
    height: 300px;
    min-width: 100px;
    padding-bottom: 20px;
}

.chat-avatar {

    height: 50px;
    background-color: #d6d6d6;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 10px;
    width: max-content;
}

.top-right {
    height: 50px;
    background-color: #aca7a7;
    overflow: hidden;
}
</style>