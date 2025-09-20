import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import _language from '../language/zh-cn.json'

export const useLanguageStore = defineStore('language', () => {
    const languageType = ref('zh-cn')
    const language = ref(_language)
    const languageOptions = ref([])
    languageOptions.value = [
        { value: 'zh-cn', label: '中文(默认)' },
        { value: 'en-us', label: 'English' },
    ]
    const defaultLanguage = computed(() => {
        return _language
    })
    const loadLanguage = async () => {
        document.documentElement.lang = languageType.value
        try {
            let url = `../language/${languageType.value}.json`
            const response = await import(url)
            return response.default || response
             
        } catch (error) {
            console.error(`Failed to load language file for ${languageType.value}:`, error)
            return _language // Fallback to default language if loading fails
        }
    }
    const setLanguage = async (lang) => {
        languageType.value = lang
        const loadedLanguage = await loadLanguage()
        language.value = loadedLanguage
    }
    return { setLanguage,defaultLanguage,language,languageOptions,languageType }
})
