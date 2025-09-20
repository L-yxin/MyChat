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
                    <el-form-item :label="languageStore.language.register.phone" prop="phone">
                        <el-input v-model="registerForm.phone" :placeholder="languageStore.language.register.OptionalFields" type="tel"></el-input>
                    </el-form-item>
                    <el-form-item :label="languageStore.language.register.phoneCode" prop="phoneCode">
                        <el-input v-model="registerForm.phoneCode" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="registerMothod">{{ languageStore.language.register.register
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
import { useLanguageStore } from '@/stores/language';
import { register } from '@/api';
import router from '@/router';
const languageStore = useLanguageStore();
const language = ref(languageStore.languageType);
const registerFormRef = ref(null);
const labelWidth = ref("max-content");
const registerForm = ref({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    phoneCode: '+86'
});
const validPhone = (phone) => {
    if(!phone) return false; // 如果手机号为空，返回false
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
};
const validEmail = (email) => {
    if(!email) return false; // 如果邮箱为空，返回false
    // 通用邮箱正则表达式
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailReg.test(email);
};


const registerRules = computed(() => ({
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
            validator: (rule, value, callback) => {
                // 获取手机号字段的值
                const phoneValue = registerForm.value.phone;
                if (validPhone(phoneValue)) {
                    return callback();
                }
                
                // 邮箱不为空时验证格式（如果需要）
                if (!validEmail(value)) {
                    return callback(new Error(languageStore.language.register.invalidEmail));
                }
                
                callback();
            },
            trigger: ['blur', 'change']
        }
    ],
    phone: [
        {
            validator: (rule, value, callback) => {
                // 获取邮箱字段的值
                const emailValue = registerForm.value.email;
                if (validEmail(emailValue)) {
                    callback();
                }
                
                // 手机号不为空时验证格式
                if (!validPhone(value)) {
                    return callback(new Error(languageStore.language.register.invalidPhoneNumber));
                }
                
                callback();
            },
            trigger: ['blur', 'change']
        }
    ],
    phoneCode: [
        {
            required: false,
            message: language.value.phoneCode,
            trigger: 'blur'
        }
    ]
}));
    
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
const registerMothod = async() => { 
    let res = await registerFormRef.value.validate();
    if(res){
        register(registerForm.value.email, registerForm.value.phone, registerForm.value.phoneCode, registerForm.value.password,registerForm.value.username).then(res=>{
            console.log(res)
            router.push('/login')
        }).catch(err=>{
            console.log(err)
            if(err.message === 'user already exists'){
                alert(languageStore.language.register.usernameExists)
                return
            }
            alert(languageStore.language.register.registerFailed )
        })
    }
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