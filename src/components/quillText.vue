<template>
  <div class="quill-editor-container" ref="editorContainer">
    <div class="custom-toolbar" ref="toolbar">
      <div class="margin-control">
        <label class="toolbar-label">段前距：</label>
        <el-input v-model="beforeMargin" type="number" min="0" max="100" size="small" style="width: 80px"
          @change="setParagraphMargin" @keydown.enter.native="handleInputEnter" placeholder="0" ref="beforeInput" />
        <span class="unit">px</span>
      </div>

      <div class="margin-control">
        <label class="toolbar-label">段后距：</label>
        <el-input v-model="afterMargin" type="number" min="0" max="100" size="small" style="width: 80px"
          @change="setParagraphMargin" @keydown.enter.native="handleInputEnter" placeholder="0" ref="afterInput" />
        <span class="unit">px</span>
      </div>
    </div>
    <div ref="editor" class="editor"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, nextTick } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import * as Parchment from 'parchment';
import { ElInput } from 'element-plus';

const editorContainer = ref(null);
const editor = ref(null);
const toolbar = ref(null);
const beforeInput = ref(null);
const afterInput = ref(null);
let quillInstance = null;
let lastCursorIndex = null; // 保存最后光标位置

//////
// 设置高度
const setHeigh =() => {
  let h1 = editorContainer.value?.clientHeight
  let h2 = toolbar.value?.clientHeight
  let h3 = document.querySelector("div[role='toolbar']")?.clientHeight
  editor.value.style.height = (h1 - h2 - h3)+ 'px'
}

//////




const lastMargin = reactive({
  before: '0',
  after: '0'
});

const beforeMargin = ref('0');
const afterMargin = ref('0');
const props = defineProps({
  modelValue: {
    default: null
  }
})
const emits = defineEmits(['update:modelValue']);
const updateValue = (val) => {
  emits('update:modelValue', val);
};
const editorContent = computed(() => {
  return quillInstance ? quillInstance.root.innerHTML : '';
});

onMounted(() => {
  // 注册段落间距格式
  const BeforeMargin = new Parchment.StyleAttributor(
    'before-margin',
    'margin-top',
    { scope: Parchment.Scope.BLOCK }
  );

  const AfterMargin = new Parchment.StyleAttributor(
    'after-margin',
    'margin-bottom',
    { scope: Parchment.Scope.BLOCK }
  );

  Quill.register('formats/before-margin', BeforeMargin, true);
  Quill.register('formats/after-margin', AfterMargin, true);

  // 初始化编辑器
  quillInstance = new Quill(editor.value, {
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'header': [1, 2, 3, false] }],
        [{ 'align': [] }],
        ['image']
      ]
    },
    placeholder: '请输入内容...'
  });

  // 监听编辑器焦点变化，保存光标位置
  quillInstance.on('selection-change', (range) => {
    if (range) {
      // 获取当前行
      let currContext = quillInstance.getLine(range.index)
      // 获取间距值
      beforeMargin.value = parseInt(currContext[0].domNode.style.marginTop) || 0;
      afterMargin.value = parseInt(currContext[0].domNode.style.marginBottom) || 0;
      lastCursorIndex = range.index; // 保存光标位置
    }
  });
  quillInstance.on('text-change', () => {
    updateValue(quillInstance.root.innerHTML);
  });

setHeigh()
});

// 设置段落间距（修复光标丢失问题）
const setParagraphMargin = () => {
  // 1. 优先使用最后保存的光标位置
  let range;
  if (lastCursorIndex !== null) {
    range = { index: lastCursorIndex, length: 0 };
  } else {
    range = quillInstance.getSelection();
  }

  if (!range) {
    console.warn('未找到光标位置，无法应用格式');
    return;
  }

  // 2. 处理间距值
  const beforeVal = beforeMargin.value;
  const afterVal = afterMargin.value;

  lastMargin.before = beforeVal.toString();
  lastMargin.after = afterVal.toString();

  // 3. 应用格式到当前行
  try {
    const [line, offset] = quillInstance.getLine(range.index);
    const lineIndex = range.index - offset;
    const lineLength = line.length();

    quillInstance.formatText(
      lineIndex,
      lineLength,
      {
        'before-margin': `${beforeVal}px`,
        'after-margin': `${afterVal}px`
      },
      'user'
    );
  } catch (err) {
    console.error('应用段落间距失败:', err);
  }

  // 4. 关键修复：恢复编辑器焦点和光标位置
  nextTick(() => {
    if (quillInstance) {
      quillInstance.focus(); // 聚焦编辑器
      // 恢复光标位置（在原位置基础上+0，保持不变）
      quillInstance.setSelection(range.index, 0, 'silent');
    }
  });
};

// 处理输入框回车事件
const handleInputEnter = (e) => {
  e.preventDefault();
  setParagraphMargin();
  // 可选：回车后让输入框失焦，确保焦点回到编辑器
  if (e.target === beforeInput.value.input) {
    afterInput.value.focus(); // 切换到下一个输入框
  } else {
    quillInstance.focus(); // 直接回到编辑器
  }
};
</script>

<style scoped>
/* 样式保持不变 */
.quill-editor-container {
  width: 100%;
  border: 1px solid #e5e7eb;
  margin: 10px 0;
  border-radius: 4px;
  height: 100%;
}

.custom-toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e7eb;
}

.margin-control {
  display: flex;
  align-items: center;
  gap: 6px;
}

.toolbar-label {
  color: #666;
  font-size: 14px;
}

.unit {
  color: #666;
  font-size: 14px;
}

.editor {
  background-color: #fff;
  overflow: auto;
}

.ql-editor p {
  transition: margin 0.2s !important;
}
</style>