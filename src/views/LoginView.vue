<template>
  <div class="prose text-lg max-w-full" style="display: flex;align-items: center;justify-content: space-around;height: 100vh;">    
    <!-- 카드영역 시작 -->
    <div class="flex flex-col relative col gap-4 gr-panel" style="width:360px;">
      <div class="flex flex-col relative col gap-4">
        <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
          <h1 style="padding: 15px 0px;text-align: center;word-spacing: 24px;letter-spacing: 40px;padding-left: 40px;">
            PROST
          </h1>
          <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
            
            <!-- 내용 시작 -->
            <input data-testid="textbox" v-model="this.email"
              class="block text-left gr-box gr-input gr-text-input mt-3 scroll-hide w-full" placeholder="id" rows="1"
              style="height: 42px;" />
            <input data-testid="textbox" v-model="this.password"
              class="block text-left gr-box gr-input gr-text-input mb-3 mt-3 scroll-hide w-full" placeholder="password" rows="1"
              style="height: 42px;"/>
            <!-- 내용 끝 -->
          </div>
        </div>
      </div>
      <!-- 버튼 영역 -->
      <div class="flex row flex-wrap gap-4">
        <button @click="loginProc" class="gr-button gr-button-lg gr-button-primary">로그인</button>
      </div>
    </div>
    <!-- 카드영역 끝 -->
  </div>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      email: 'admin',
      password: 'password',
    }
  },
  methods: {
    loginProc() {
      this.axios({
        url: "/api/loginProcess",
        method: "POST",
        data: {
          email: this.email,
          password: this.password
        },
      }).
        then(res => {
          console.log("응답 데이터 : " + JSON.stringify(res.data.token));
          this.$store.state.token = res.data.token
          router.push('/')
        })
        .catch(error => {
          console.log("에러 데이터 : " + error.data);
        })
        .finally(() => {
        })
    }
  },
}

</script>

<style lang="scss">

</style>


