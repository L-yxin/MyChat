<template>
    <el-container>
        <el-header class="ep-header">
            <el-row class="ep-link">
                <el-link class="ep-link-item" @click="$router.push('/login')">{{ languageStore.language.index.login
                    }}</el-link>
                <span class="ep-link-item ep-link-item-span"> / </span>
                <el-link class="ep-link-item" @click="$router.push('/register')">{{
                    languageStore.language.index.register }}</el-link>
            </el-row>
            <el-row class="ep-language">
                <el-select class="ep-language-select" v-model="language" placeholder="请选择语言"
                    @change="languageStore.setLanguage(language)">
                    <el-option class="ep-language-option" v-for="item in languageStore.languageOptions"
                        :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </el-row>
        </el-header>
        <el-main class="ep-main">
            <el-row class="ep-title">{{ languageStore.language.index.title }}</el-row>
            <el-row class="ep-subtitle">{{ languageStore.language.index.subtitle }}</el-row>
            <el-row class="ep-row" justify="space-around" :gutter="24">
                <el-col :span="8">
                    <el-card class="box-card" justify="center">
                        <lock class="ep-card-icon" />
                        <el-text type="primary" class="ep-card-title">{{ languageStore.language.index.secure
                            }}</el-text>
                        <el-text class="ep-card-text">{{ languageStore.language.index.secureInfo }}</el-text>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card" justify="center">
                        <Connection class="ep-card-icon" />
                        <el-text type="primary" class="ep-card-title">{{ languageStore.language.index.sync }}</el-text>
                        <el-text class="ep-card-text">{{ languageStore.language.index.syncInfo }}</el-text>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card" justify="center">
                        <User class="ep-card-icon" />
                        <el-text type="primary" class="ep-card-title">{{ languageStore.language.index.MychatMoments
                            }}</el-text>
                        <el-text class="ep-card-text">{{ languageStore.language.index.MychatMomentsInfo }}</el-text>
                    </el-card>
                </el-col>
            </el-row>

        </el-main>
        <el-footer class="login-footer">
            <span>{{ languageStore.language.copyright }}</span>
        </el-footer>
    </el-container>

</template>
<script setup>
import {
    ElRow, ElCol, ElCard, ElMain, ElText, ElContainer, ElHeader, ElSelect, ElOption, ElButton,
    ElLink, ElFooter
} from 'element-plus'
import { Lock, Connection, User } from '@element-plus/icons-vue'
import { useLanguageStore } from '@/stores/language';
import { ref } from 'vue';
const languageStore = useLanguageStore();
const language = ref(languageStore.languageType);


</script>
<style scoped>
.el-container {
    height: 100%;
    width: 100%;
}

.ep-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.ep-link {
    margin-right: 20px;
}

.ep-link-item-span {
    margin: 0 5px;
}

.ep-link-item {
    color: black;
}

.ep-link-item:hover {
    color: blue;
}

.ep-language {
    width: 150px;
}

.ep-language-select * {
    background-color: transparent;
    border: none;
    width: 150px;
    color: black;
}

.ep-language-option * {
    border: none;
    width: 150px;
}

.ep-main {
    margin: auto;
    border-radius: 10px;
    width: 80vw;
    min-width: 650px;
    padding: 20px;
}

.ep-title {
    font-size: 36px;
    color: #4361ee;
    text-align: center;
    margin-bottom: 20px;
    flex-direction: column;
}

.ep-subtitle {
    font-size: 24px;
    color: #202020;
    text-align: center;
    flex-direction: column;
    margin-bottom: 20px;
}

.ep-row {
    height: min-content;
}

.ep-row * {
    flex-direction: column;
    text-align: center;
}

.box-card {
    display: flex;
    flex-direction: column;
    align-content: center;
    height: 95%;
    padding: 25px;
    box-sizing: border-box;
    background-color: #f8f9fa;
    max-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

}
.box-card:hover{
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.box-card * {
    display: block;

}

.ep-card-icon {
    width: 50px;
    margin: auto;
    color: #495057;
}

.ep-card-title {
    font-size: 24px;
}

.ep-card-text {
    font-size: 16px;
    color: #495057;
}

.login-footer {
    color: #3d3d3d;
}
</style>