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
    <div>
        <Profile :isUpdateBalance="transactionStore.isUpdateBalance" />
        <!-- Transfer form -->
        <div>
            <h1 class="text-4xl mb-10">Transfer</h1>
            <label class="input input-accent flex items-center gap-2 mb-5">
                To Account:
                <input type="number" class="grow" placeholder="01XXXXXXX919" v-model="transactionStore.toAccount" />
            </label>
            <label class="input input-accent flex items-center gap-2 mb-5">
                Amount:
                <input type="number" class="grow" placeholder="0" v-model="transactionStore.amount" />
            </label>
            <button @click="transactionStore.transferToOther()" class="btn btn-accent w-full">Deposit</button>
        </div>
    </div>
</template>