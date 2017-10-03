import Vue from 'vue'
import Router from 'vue-router'
import Page1 from '@/pages/Page1'
import Page2 from '@/pages/Page2'

Vue.use(Router)

export default new Router({
    routes: [
      	{
			path: '/1',
			name: 'page1',
			component: Page1
		}, {
			path: '/2',
			name: 'page2',
			component: Page2
		}
    ]
})
