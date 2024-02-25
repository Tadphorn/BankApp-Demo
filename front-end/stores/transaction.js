import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from '../src/plugin/axios'
import Swal from 'sweetalert2'

export const useTransactionStore = defineStore('transaction', () => {
    const router = useRouter()
    const amount = ref('')
    const balance = ref(0)
    const toAccount = ref('')
    const isUpdateBalance = ref(false)

    const getBalance = async () => {
        try {
            const res = await axios.get('http://localhost:5000/getUser')
            if (res.status === 200) {
                balance.value = res.data.user.balance
                console.log('get balance success---', res.data.user.balance)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const deposit = async () => {
        try {
            if (amount.value <= 0) {
                return
            }
            console.log('deposit na jaa', amount.value)
            const res = await axios.post('http://localhost:5000/deposit', {
                amount: parseInt(amount.value),
            })
            if (res.status === 200) {
                console.log('deposit success', res.data)
                balance.value = res.data.balance
                //update balance
                isUpdateBalance.value = true
                amount.value = ''
                Swal.fire({
                    icon: "success",
                    title: "Deposited success",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            amount.value = ''
        } catch (err) {
            console.error(err)
        }
    }

    const isBalanceEnough = () => {
        if (amount.value <= 0) {
            return false
        }
        else if (amount.value > balance.value) {
            console.log('amount not enough----', balance.value)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your balance is not enough!",
                confirmButtonColor: "#34B5A5"
            });
            amount.value = ''
            return false
        } else {
            return true
        }
    }

    const withdraw = async () => {
        try {
            console.log('withdraw na jaa')
            await getBalance()
            if (!isBalanceEnough()) {
                return
            }
            const res = await axios.post('http://localhost:5000/withdraw', {
                amount: parseInt(amount.value),
            })
            if (res.status === 200) {
                console.log('deposit success', res.data)
                balance.value = res.data.balance
                //update balance
                isUpdateBalance.value = true
                amount.value = ''
                Swal.fire({
                    icon: "success",
                    title: "Withdraw success",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            amount.value = ''
        } catch (err) {
            console.error(err)
        }
    }

    const transferToOther = async () => {
        try {
            console.log('transfer na jaa')
            await getBalance()
            if (!isBalanceEnough()) {
                return
            }
            const res = await axios.post('http://localhost:5000/transfer', {
                toAccount: toAccount.value,
                amount: parseInt(amount.value),
            })
            if (res.status === 200) {
                console.log('transfer success', res.data)
                balance.value = res.data.balance
                //update balance
                isUpdateBalance.value = true
                Swal.fire({
                    icon: "success",
                    title: "Transfer success",
                    showConfirmButton: false,
                    timer: 1500
                });
                amount.value = ''
                toAccount.value = ''
            }
        } catch (err) {
            console.error(err)
            Swal.fire({
                icon: "error",
                title: "Account not found!",
                text: "You maybe type wrong account number",
                confirmButtonColor: "#34B5A5"
            });
        }
    }

    //for History page
    const receive = ref([])
    const getReceiveHistory = async () => {
        try {
            const res = await axios.get('http://localhost:5000/receive')
            if (res.status === 200) {
                console.log('get receiveHistory success---', res.data)
                //format timestamp
                receive.value = res.data.map(item => ({
                    ...item,
                    timeStamp: formatTimestamp(item.timeStamp)
                }));
            }
        } catch (err) {
            console.error(err)
        }
    }

    const transfer = ref([])
    const getTransferHistory = async () => {
        try {
            const res = await axios.get('http://localhost:5000/transfer')
            if (res.status === 200) {
                console.log('get transferHistory success---', res.data)
                //format timestamp
                transfer.value = res.data.map(item => ({
                    ...item,
                    timeStamp: formatTimestamp(item.timeStamp)
                }));
            }
        } catch (err) {
            console.error(err)
        }
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }



    return {
        amount,
        withdraw,
        deposit,
        isUpdateBalance,
        balance,
        getReceiveHistory,
        getTransferHistory,
        receive,
        transfer,
        toAccount,
        transferToOther

    }
})