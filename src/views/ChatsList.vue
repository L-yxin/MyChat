<template>
    <el-container>
        <el-aside width="70px" class="function-list">
            <el-row class="function-list-top">
                <el-image :src="logo" alt="" style="width: 50px;height: 50px;"></el-image>
                <el-icon size="50px">
                    <ChatSquare />
                </el-icon>
                <el-icon size="50px">
                    <User />
                </el-icon>
                <el-icon size="50px">
                    <HelpFilled />
                </el-icon>

            </el-row>
            <el-row class="function-list-bottom">
                <el-icon size="50px">
                    <Setting />
                </el-icon>
            </el-row>
        </el-aside>
        <el-container class="main-container"> 
            <router-view></router-view>
        </el-container>
    </el-container>

</template>
<script setup>
import { ChatRound,Setting,HelpFilled,User,ChatSquare } from '@element-plus/icons-vue'
import logo from '../assets/logo.svg'
</script>
<style scoped>
.function-list {
    background-color: #1b3458;
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;
}

.function-list-top {
    width: 50px;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    gap: 25px;

}
.function-list-bottom {
    width: 50px;
    height: 50px;

}

</style>