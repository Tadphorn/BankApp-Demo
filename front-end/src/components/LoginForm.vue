<script setup>
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();
</script>

<template>
    <div>
        <div class="hero-content flex-col lg:flex-row">
            <div class="text-center lg:text-left max-w-lg pr-10">
                <h1 class="text-5xl font-bold mb-3 text-accent">myBank</h1>
                <h1 class="text-2xl font-bold">Login First!</h1>
                <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                    quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">

                    <label class="label">
                        <span class="label-text">Citizen ID</span>
                    </label>
                    <label class="input input-bordered flex items-center gap-2 -mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="w-4 h-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>

                        <input type="text" class="grow" placeholder="Citizen ID" v-model="userStore.citizenID" />
                    </label>
                    <label class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <label class="input input-bordered flex items-center gap-2 mb-5 -mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="w-4 h-4 opacity-70">
                            <path fill-rule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clip-rule="evenodd" />
                        </svg>
                        <input type="password" class="grow" value="" placeholder="Password" v-model="userStore.password" />
                    </label>
                    <button class="btn btn-accent w-full" @click="userStore.login()">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>