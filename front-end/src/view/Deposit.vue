

<script setup>
import { onMounted } from 'vue';
import { useTransactionStore } from '../../stores/transaction';
import { useUserStore } from '../../stores/user';
import Profile from '../components/Profile.vue';

const userStore = useUserStore();
const transactionStore = useTransactionStore();

onMounted(async () => {
    userStore.onAuthChange();
});

</script>

<template>
    <div class="w-full">
        <Profile :isUpdateBalance="transactionStore.isUpdateBalance" />
        <!-- Deposit form -->
        <div>
            <h1 class="text-4xl mb-10">Deposite</h1>
            <label class="input input-accent flex items-center gap-2 mb-5">
                Amount:
                <input type="number" class="grow" placeholder="0" v-model="transactionStore.amount" />
            </label>
            <button @click="transactionStore.deposit()" class="btn btn-accent w-full">Deposit</button>
        </div>

    </div>
</template>