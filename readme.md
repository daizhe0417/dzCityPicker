## dzCityPicker

> 省市区选择组件，基于Bootstrap和jQuery。

> 省市区数据和部分css样式来自 [Tao Shi](https://github.com/tshi0912/city-picker) 的city-picker，非常感谢！这个插件其实挺好，但是由于不是专业的前端，没有用明白这个插件，当选择省市区的时候不能触发input的change事件，因此自己写了个简单的插件，请大家多指教。

### Installation

> Include files:

```html
<link type="text/css" href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>!-- bootstrap css and fonts is required -->
<link type="text/css" href="dzCityPicker.css" rel="stylesheet"/>

<script src="lib/jquery.min.js"></script><!-- jQuery is required -->
<script src="lib/bootstrap/js/bootstrap.min.js"></script><!-- bootstrap is required -->
<script src="city-picker.data.js"></script>
<script src="dzCityPicker.js"></script>
```

> Create HTML elements:

```html
<input class="form-control" id="city" placeholder="选择省市区">
```

### Usage

> Initialize with $.fn.dzCityPicker method:

```javascript
$("#city").dzCityPicker();
```

> Custom districts on initialization:
```javascript
$('#city').dzCityPicker({defaultVal:'辽宁省-阜新市-海州区'});
```

> Set districts:
```javascript
$('#city').dzCityPicker('setVal','辽宁省-阜新市-海州区');
$('#city').dzCityPicker('setVal','');
```

> Clear:
```javascript
$('#city').dzCityPicker('setVal','');
```

> Make dzCityPicker disabled or not:
```javascript
$('#city').dzCityPicker('disabled',true);
$('#city').dzCityPicker('disabled',false);
```

