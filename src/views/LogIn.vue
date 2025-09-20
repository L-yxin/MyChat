<template>
  <el-container class="login-container">
    <el-header class="ep-header">
      <el-row class="ep-link">
        <el-link class="ep-link-item" @click="$router.push('/')">{{ languageStore.language.login.home
        }}</el-link>
      </el-row>
      <el-row class="ep-language">
        <el-select class="ep-language-select" v-model="language" placeholder="请选择语言"
          @change="languageStore.setLanguage(language)">
          <el-option class="ep-language-option" v-for="item in languageStore.languageOptions" :key="item.value"
            :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-row>
    </el-header>
    <el-main>
      <el-card class="login-card">
        <div class="login-window">
          <el-form class="login-form login-formAnimation1" ref="formRef" :model="loginForm" :rules="loginRules"
            label-width="80px">
            <div class="login-mothod" v-show="showLoginMothod('mothod')" ref="mothodCard">
              <h1>{{ languageStore.language.login.howWouldYouLikeToLogIn }}</h1>
              <div class="ep-login-mothod-card" @click="gotoEmailLogin">
                <p class="ep-login-mothod-subtitle">{{ languageStore.language.login.email }}</p>
                <el-icon class="ep-icon-right">
                  <ArrowRight />
                </el-icon>
              </div>
              <div class="ep-login-mothod-card" @click="gotoAccountLogin">
                <p class="ep-login-mothod-subtitle">{{ languageStore.language.login.account }}</p>
                <el-icon class="ep-icon-right">
                  <ArrowRight />
                </el-icon>
              </div>
            </div>
            <div class="login-account" v-show="showLoginMothod('account')" ref="accountCard">
              <h1>{{ languageStore.language.login.pleaseEnterYourAccount }}</h1>
              <el-form-item :label="languageStore.language.login.phoneCode" prop="phoneCode"
                class="ep-login-Item">
                <el-input class="ep-login-input" :placeholder="languageStore.language.login.phoneCode"
                  v-model="loginForm.phoneCode" disabled />
              </el-form-item>
              <el-form-item :label="languageStore.language.login.account" prop="phone" class="ep-login-Item">
                <el-input class="ep-login-input" :placeholder="languageStore.language.login.account"
                  v-model="loginForm.phone" />
              </el-form-item>
              <el-button class="ep-login-button" ref="loginNext" @click="gotoPasswordLogin">{{
                languageStore.language.login.next }}</el-button>
            </div>
            <div class="login-email" v-show="showLoginMothod('email')" ref="emailCard">
              <h1>{{ languageStore.language.login.pleaseEnterYourEmail }}</h1>
              <el-form-item :label="languageStore.language.login.email" prop="email" class="ep-login-Item">
                <el-input class="ep-login-input" :placeholder="languageStore.language.login.email"
                  v-model="loginForm.email" />
              </el-form-item>
              <el-button class="ep-login-button" ref="loginNext2" @click="gotoPasswordLogin">{{
                languageStore.language.login.next }}</el-button>
            </div>
            <div class="login-password" v-show="showLoginMothod('password')" ref="passwordCard">
              <h1>{{ languageStore.language.login.pleaseEnterYourPassword }}</h1>
              <el-form-item :label="languageStore.language.login.password" prop="password" class="ep-login-Item">
                <el-input type="password" :show-password="true" class="ep-login-input"
                  :placeholder="languageStore.language.login.pleaseEnterYourPassword" v-model="loginForm.password" />
              </el-form-item>
              <el-button @click="loginMothod" class="ep-login-button" ref="loginButton">{{ languageStore.language.login.login
                }}</el-button>
            </div>
          </el-form>
        </div>

      </el-card>
    </el-main>
    <el-footer class="login-footer">
      <span>{{ languageStore.language.copyright }}</span>
    </el-footer>
  </el-container>
</template>
<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useLanguageStore } from '@/stores/language'
import router from '@/router'
import {login} from '@/api'
const languageStore = useLanguageStore()
const language = ref(languageStore.languageType)
const loginButton = ref(null)
const loginNext = ref(null)
const loginNext2 = ref(null)
const mothodCard = ref(null)
const accountCard = ref(null)
const emailCard = ref(null)
const passwordCard = ref(null)
// 表单数据 - 使用 reactive（正确）
let loginForm = reactive({
  phone: '',
  password: '',
  email: '',
  phoneCode: '+86'
})

// 表单引用 - 单独创建 ref 变量（新增这一行）
const formRef = ref(null)

// 登录切换逻辑
let optionsHistory = ref(["mothod"])

let loginRules = computed(() =>
({
  phone: [
    {
      validator: (rule, value, callback) => {
        // 获取表单中的email值
        const emailValue = rule.form?.email;
        // 如果phone和email都为空，提示至少输入一个
        if (!value && !emailValue) {
          return callback(new Error(languageStore.language.login.pleaseEnterYourAccount));
        }

        // 如果输入了phone，验证长度
        if (value && value.length !== 11) {
          return callback(new Error(languageStore.language.login.lengthOf11Characters));
        }
        callback();
      },
      trigger: ['blur', 'change']
    }
  ],
  email: [
    {
      validator: (rule, value, callback) => {
        // 获取表单中的username值
        const phone = rule.form?.username;
        // 如果username和email都为空，不需要在这里重复提示（username的验证会提示）
        if (!value && !phone) {
          return callback(new Error(languageStore.language.login.pleaseEnterYourEmail));
        }
        // 如果输入了email，验证格式
        if (value) {
          const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailReg.test(value)) {
            return callback(new Error(languageStore.language.login.invalidEmailAddress));
          }
        }
        callback();
      },
      trigger: ['blur', 'change']
    }
  ],
  password: [
    { required: true, message: languageStore.language.login.pleaseEnterYourPassword, trigger: 'blur' },
    { min: 6, max: 10, message: languageStore.language.login.lengthOf6to10Characters, trigger: 'blur' }
  ]
}))
const loginMothod = async () => {
  let valid = await formRef.value.validateField('password')
   
  if (valid) {
  login(loginForm.email,loginForm.phone,loginForm.phoneCode,loginForm.password).then(res=>{
    alert(languageStore.language.login.loginSuccess)
    router.push('/ChatsList')
  }).catch(err=>{
    alert(languageStore.language.login.loginFailed)
   router.go(0)
  })
   
  }
  else {
    alert(languageStore.language.login.loginFailed)
  }
}
let gotoEmailLogin = () => {
  optionsHistory.value = ["mothod", "email"]
  formRef.value.$el.classList.remove("login-formAnimation1")
  formRef.value.$el.classList.add("login-formAnimation2")
}
let gotoAccountLogin = () => {

  optionsHistory.value = ["mothod", "account"]
  formRef.value.$el.classList.remove("login-formAnimation1")
  formRef.value.$el.classList.add("login-formAnimation2")
}

let gotoPasswordLogin = async () => {


  if (await formRef.value.validateField('phone').catch(res=>{}) || await formRef.value.validateField('email')) {
    optionsHistory.value.push("password")
    formRef.value.$el.classList.remove("login-formAnimation2")
    formRef.value.$el.classList.add("login-formAnimation3")
  }
}
let showLoginMothod = (mothod) => {
  return optionsHistory.value.includes(mothod)

}



</script>
<style scoped>
.ep-link-item {
  color: black;
  margin-right: 20px;
}

.ep-link-item:hover {
  color: blue;
}

.ep-login-button {
  position: absolute;

}

.login-window {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ep-login-Item {
  border: 1px solid rgba(0, 0, 0, .1);
  display: flex;
  flex-direction: row;
}

:deep(.ep-login-Item .el-form-item__label) {
  width: max-content !important;
}

:deep(.ep-login-input .el-input__wrapper) {
  background-color: transparent;
  border: none;
  box-shadow: none;
}

:deep(.ep-login-input .el-input__inner) {
  box-shadow: none;
  outline: none;
  border: none;
  background-color: transparent;
  box-shadow: none;
  display: inline-block;
}

.ep-login-mothod-card {
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, .1);
  margin-bottom: 10px;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
}

.ep-login-mothod-subtitle {
  font-size: 1rem;
  justify-self: start;
  align-self: center;
}

.ep-icon-right {
  text-align: right;
  justify-self: end;
  align-self: center;
}

.ep-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
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

.login-card {
  border-radius: 10px;
  width: 500px;
  height: 485px;
  margin: 0 auto;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
  border: none;
  background: rgba(255, 255, 255, 0.5);

}


@keyframes Lifemove1 {
  from {
    transform: translateX(460px);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes Lifemove2 {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(460px * -1));
  }
}

@keyframes Lifemove3 {
  from {
    transform: translateX(calc(460px * -1));
  }

  to {
    transform: translateX(calc(460px * -2));
  }
}

:deep(.login-form) {
  width: 100%;
  /* padding: 10px; */
  display: grid;
  grid-template-columns: 100% 100% 100%;
  /* gap: 20px; */
  animation: null 1s ease-in-out forwards;
}

.login-formAnimation1 {
  animation-name: Lifemove1;
}

.login-formAnimation2 {
  animation-name: Lifemove2;
}

.login-formAnimation3 {
  animation-name: Lifemove3;
}

.login-form>* {
  width: 100%;
  /* margin-bottom: 20px; */
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}

.login-button {
  width: 150px;
  margin: 0 auto;
}
</style>