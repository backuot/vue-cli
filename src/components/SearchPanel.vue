<template>
  <div :class="$style.searchPanel">
    <h1 :class="$style.title">Find your movie</h1>
    <div :class="$style.content">
      <div :class="$style.searchContainer">
        <TextBox
          :class="$style.searchInput"
          placeholder="Search"
          @input="onTextChanged"
        />
        <Button
          text="Search"
          @click="onSearchClicked"
        />
      </div>
      <div :class="$style.searchTypeContainer">
        <span :class="$style.searchTypeNote">
          Search by
        </span>
        <RadioBox
          :options="radioOptions"
          @changed="onRadioChanged"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import RadioBox from '@/components/ui/RadioBox.vue';
import TextBox from '@/components/ui/TextBox.vue';
import Button from '@/components/ui/Button.vue';

@Options({
  components: { Button, TextBox, RadioBox },
  emits: ['search'],
})
export default class SearchPanel extends Vue {
  searchValue = '';

  searchOption = 0;

  radioOptions = [
    {
      id: 1,
      value: 0,
      text: 'Title',
    },
    {
      id: 2,
      value: 1,
      text: 'Genre',
    },
  ];

  onTextChanged(e: any) :void {
    this.searchValue = e.target.value;
  }

  onRadioChanged(value: number): void {
    this.searchOption = value;
  }

  onSearchClicked(): void {
    this.$emit('search', this.searchValue, this.searchOption);
  }
}
</script>

<style lang="scss" module>
.searchPanel {
  width: 100%;
  padding: 0 50px;
}

.title {
  padding: 20px 0;
  margin: 0;
  font-size: 30px;
  font-weight: normal;
  line-height: 1;
  color: white;
  text-transform: uppercase;
}

.content {
  display: flex;
  flex-direction: column;
}

.searchContainer {
  display: flex;
  width: 100%;
}

.searchTypeContainer {
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 80px;
}

.searchTypeNote {
  color: white;
  text-transform: uppercase;
  margin-right: 20px;
}

.searchInput {
  margin-right: 10px;
}
</style>
