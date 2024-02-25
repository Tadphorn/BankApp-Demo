<script setup>
import { useUserStore } from '../../stores/user';
import { useTransactionStore } from '../../stores/transaction';

const userStore = useUserStore();
const transactionStore = useTransactionStore();

const handleLogout = () => {
    userStore.logout();
    transactionStore.isUpdateBalance = false;
    console.log('logout', transactionStore.isUpdateBalance);
}

</script>


<template>
    <div class="flex fixed top-0 justify-center a right-0 w-full max-h-32">
        <div v-if="userStore.isLogin" class="w-2/3 navbar bg-base-100 mb-40 shadow-xl rounded-box mt-5">
            <div class="flex-1">
                <div class="w-1/12 text-xl pl-5 mr-5 text-accent">myBank</div>
                <router-link to="/deposit" class="btn btn-ghost text-base">Deposit</router-link>
                <router-link to="/withdraw" class="btn btn-ghost text-base">Withdraw</router-link>
                <router-link to="/transfer" class="btn btn-ghost text-base">Transfer</router-link>
                <router-link to="/history" class="btn btn-ghost text-base">History</router-link>
            </div>
            <div class="flex-none">
                <button @click="handleLogout()">Logout</button>
            </div>
        </div>
    </div>
</template>