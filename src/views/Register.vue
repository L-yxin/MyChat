<template>
    <el-container>
        <el-header class="ep-header">
            <el-row class="ep-link">
                <el-link class="ep-link-item" @click="$router.push('/')">{{ languageStore.language.login.home
                }}</el-link>
            </el-row>
            <el-row class="ep-language">
                <el-select class="ep-language-select" v-model="language" @change="languageStore.setLanguage(language)">
                    <el-option class="ep-language-option" v-for="item in languageStore.languageOptions"
                        :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </el-row>
        </el-header>
        <el-main class="ep-main">
            <el-card class="ep-register-card">
                <h1>{{ languageStore.language.register.register }}</h1>
                <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" :label-width="labelWidth">
                    <el-form-item :label="languageStore.language.register.username" prop="username">
                        <el-input v-model="registerForm.username"></el-input>
                    </el-form-item>
                    <el-form-item :label="languageStore.language.register.email" prop="email">
                        <el-input v-model="registerForm.email" :placeholder="languageStore.language.register.OptionalFields" type="email"></el-input>
                    </el-form-item>
                    <el-form-item :label="languageStore.language.register.password" prop="password">
                        <el-input v-model="registerForm.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item :label="languageStore.language.register.confirmPassword" prop="confirmPassword">
                        <el-input v-model="registerForm.confirmPassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="register">{{ languageStore.language.register.register
                        }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
        <el-footer class="login-footer">
            <span>{{ languageStore.language.copyright }}</span>
        </el-footer>
    </el-container>

</template>
<script setup>
import {
    ElRow, ElCol, ElCard, ElMain, ElText, ElContainer, ElHeader, ElSelect, ElOption, ElButton,
    ElLink, ElFooter, ElForm, ElFormItem, ElInput
} from 'element-plus'
import { Lock, Connection, User } from '@element-plus/icons-vue'
import { useLanguageStore } from '@/stores/language';
import { ref, onMounted, watch,computed } from 'vue';
const languageStore = useLanguageStore();
const language = ref(languageStore.languageType);
const registerFormRef = ref(null);
const labelWidth = ref("max-content");
const registerForm = ref({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
});
const registerRules = computed(()=>({
    username: [
        {
            required: true,
            message: languageStore.language.register.theUsernameCannotBeEmpty,
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: languageStore.language.register.thePasswordCannotBeEmpty,
            trigger: 'blur'
        }
    ],
    confirmPassword: [
        {
            required: true,
            message: languageStore.language.register.thePasswordCannotBeEmpty,
            trigger: 'blur'
        }
    ],
    email: [
        {
            required: false,
            message: language.value.email,
            trigger: 'blur'
        }
    ]
}))
const updateLabelWidth = () => {
    labelWidth.value = "max-content"
    let labbels = registerFormRef.value.$el.getElementsByClassName('el-form-item__label')
    setTimeout(() => {
        let maxWidth = 0;
        for (let i = 0; i < labbels.length; i++) {
            const label = labbels[i];
            if (label.offsetWidth > maxWidth) {
                maxWidth = label.offsetWidth;
            }
        }
        labelWidth.value = maxWidth + 'px';
    }, 0)
}
const register = () => { 
    registerFormRef.value.validate(async (valid) => { 
        if (valid) { 
            console.log('submit!'); 
        } else if (!valid) { 
            console.log('error submit!!'); 
            return false;
        
        } else { 
            console.log('error submit!!'); 
            return false; 
        }
    })
}
watch(languageStore, updateLabelWidth)
onMounted(() => {
    updateLabelWidth()

});

</script>
<style scoped>
:deep(.el-form-item__label) {
    white-space: nowrap;
}

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
</style>