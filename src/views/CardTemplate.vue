<template>
  <!-- 카드영역 시작 -->
  <div class="flex flex-col relative col gap-4 gr-panel">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <!-- 내용 시작 -->
          <label class="block">
            <span class="h2 block p-2">
              name
            </span>
          </label>
          <textarea data-testid="textbox" class="w-full scroll-hide block gr-box gr-input gr-text-input" placeholder=""
            rows="1"></textarea>
          <!-- 내용 끝 -->
        </div>
      </div>
    </div>
    <!-- 버튼 영역 -->
    <div class="flex row flex-wrap gap-4">
      <button class="gr-button gr-button-lg gr-button-secondary">클리어</button>
      <button class="gr-button gr-button-lg gr-button-primary">제출하기</button>
    </div>
  </div>
  <!-- 카드영역 끝 -->
</template>

<style lang="scss">
</style>
