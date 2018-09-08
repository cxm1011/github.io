# router的原理
详见：https://yuchengkai.cn/docs/zh/frontend/framework.html#%E8%B7%AF%E7%94%B1%E5%8E%9F%E7%90%86

前端路由实现起来其实很简单，本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新。目前单页面使用的路由就只有两种实现方式

hash 模式
history 模式
www.test.com/##/ 就是 Hash URL，当 ## 后面的哈希值发生变化时，不会向服务器请求数据，可以通过 hashchange 事件来监听到 URL 的变化，从而进行跳转页面。

History 模式是 HTML5 新推出的功能，比之 Hash URL 更加美观。当刷新页面或者输入URL时会向服务器请求，所以history方式需要后端配合重定向