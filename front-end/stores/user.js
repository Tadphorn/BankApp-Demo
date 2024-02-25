import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from '../src/plugin/axios'

export const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const userInfo = ref({})
    const citizenID = ref('1100600462801')
    const password = ref('')

    const getUser = async () => {
        try {
            const res = await axios.get('http://localhost:5000/getUser')
            if (res.status === 200) {
                userInfo.value = res.data.user
                console.log('get user success---', userInfo.value)
            }
        } catch (err) {
            console.error(err)
        }
    }

    function onAuthChange() {
        const token = localStorage.getItem('token')
        if (token) {
            getUser()
        }
    }

    const login = async () => {
        try {
            console.log('login na jaa')
            const res = await axios.post('http://localhost:5000/login', {
                citizenID: citizenID.value,
                password: password.value,
            })
            if (res.status === 200) {
                router.push('/deposit')
                // console.log('login success', res.data.user)
                userInfo.value = res.data.user
                // Save token to local storage
                localStorage.setItem("token", res.data.user.token);
            }
            password.value = ''
            // citizenID.value = ''
        } catch (err) {
            console.error(err)
        }
    }

    const logout = async () => {
        try {
            console.log('logout na jaa')
            const res = await axios.get('http://localhost:5000/logout')
            if (res.status === 200) {
                // Remove token from local storage
                localStorage.removeItem('token')
                router.push('/')
                console.log('logout success')
            }
        } catch (err) {
            console.error(err)
        }
    }


    return {
        citizenID,
        password,
        logout,
        userInfo,
        login,
        getUser,
        onAuthChange
    }
});