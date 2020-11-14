<template>
  <q-page>
    <q-card class="card">
      <q-card-section>
         <q-icon name="file_download" size="xl" />
      </q-card-section>
      <q-card-section>
        <q-btn-group push>
          <q-btn glossy text-color="black" push label="Вход" icon="verified_user"
            class="group-btn"
            :class="{'active': tab === 'login'}"
            @click="tab = 'login'"
           />
          <q-btn glossy text-color="black" push label="Регистрация"
            class="group-btn"
            :class="{'active': tab === 'reg'}"
            @click="tab = 'reg'"
          />
        </q-btn-group>
      </q-card-section>
      <q-card-section>
        <q-tabs
          v-model="tab"
          class="text-teal"
        >
          <q-tab name="login" label="Вход" />
          <q-tab name="reg" label="Регистрация" />
        </q-tabs>
      </q-card-section>
      <q-card-section>
        <q-tab-panels v-model="tab">
          <q-tab-panel name="login">
            <q-form @submit="onLogin">
              <q-input filled v-model="login" label="Имя пользователя"
                lazy-rules
                :rules="[ () => login && login.length > 0 || 'Укажите имя пользователя' ]"
                :error="loginHasError"
              >
                <template v-slot:error>
                  <div>Пароль не правильный, либо такого пользователя не существует</div>
                </template>
              </q-input>
              <q-input filled class="q-mt-md" v-model="password" label="Пароль" title="Введите пароль" type="password"
                lazy-rules
                :rules="[ val => login && login.length > 0 || 'Не может быть пустым']"
              />
              <q-btn type="submit" color="white" class="full-width q-mt-md" text-color="black" label="Вход" />
            </q-form>
          </q-tab-panel>
          <q-tab-panel name="reg">
            <q-form @submit="onReg">
              <q-input filled v-model="login" label="Имя пользователя"
                :rules="[ val => login && login.length > 0 || 'Не может быть пустым']"
              />
              <q-input filled class="q-mt-md" v-model="email" label="Эл.почта" title="Эл.почта"
                :rules="[ val => val && val.length > 0 || 'Не может быть пустым']"
              />
              <q-input filled class="q-mt-md" v-model="password" label="Пароль" title="Пароль" type="password"
                :rules="[ val => val && val.length > 0 || 'Не может быть пустым']"
                :error="regFormErros.password"
              >
                <template v-slot:error>
                  <div>Пароли должны совпадать</div>
                </template>
              </q-input>
              <q-input filled class="q-mt-md" v-model="passwordConfirm" label="Повторите пароль" title="Повторите пароль" type="password"
                :rules="[ val => val && val.length > 0 || 'Не может быть пустым']"
              />
              <q-checkbox v-model="isNotRobot" label="Я не робот"
                :rules="[ val => val || 'Укажите что вы не робот']"
              />
              <div v-if="regFormErros.isNotRobot" class="text-red-8">Укажите что вы не робот</div>
              <q-btn type="submit" color="white" class="full-width q-mt-md" text-color="black" label="Регистрация" />
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import { Todo, Meta } from 'components/models'
import { defineComponent, ref, Ref, SetupContext, reactive } from '@vue/composition-api'

interface Props {}

export default defineComponent({
  name: 'LoginPage',
  setup (props: Props, ctx: SetupContext) {
    const tab = ref('login');
    const login = ref('');
    const password = ref('');
    const passwordConfirm = ref('');
    const email = ref('');
    const isNotRobot = ref(false);

    const loginHasError = ref(false);

    function onLogin () {
      if (login.value === 'test' && password.value === '123') {
        ctx.root.$router.push({ path: '/' });
      } else {
        loginHasError.value = true;
      }
    }

    const regFormErros = reactive({
      isNotRobot: false, password: false
    }) as {[key: string]: boolean};

    function onReg () {
      for (let errorKey of Object.keys(regFormErros)) {
        regFormErros[errorKey] = false;
      }
      if (!isNotRobot.value) {
        regFormErros.isNotRobot = true;
      }
      if (password.value !== passwordConfirm.value) {
        regFormErros.password = true;
      }
      let errorsCounts = 0;
      for (let val of Object.values(regFormErros)) {
        if (val) {
          ++errorsCounts;
        }
      }
      if (errorsCounts === 0) {
        alert('Регистрация прошла успешно!');
        window.location.href = 'https://www.tiktok.com/@kiryshkka/video/6889395846987779330';
      }
    }

    return { login, tab, password, passwordConfirm, email, isNotRobot, onLogin, loginHasError, onReg, regFormErros };
  }
})
</script>

<style lang='scss' scoped>
.card {
  max-width: 400px;
  text-align: center;
  margin: 50px auto 0 auto;
}
.group-btn {
  background-color: rgb(68, 206, 98);
  &.active {
    background-color: rgb(58, 173, 83);
  }
}
</style>
