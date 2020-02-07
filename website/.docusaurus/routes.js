
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  
{
  path: '/blog',
  component: ComponentCreator('/blog'),
  exact: true,
  
},
{
  path: '/blog/2016/03/11/blog-post',
  component: ComponentCreator('/blog/2016/03/11/blog-post'),
  exact: true,
  
},
{
  path: '/blog/2017/04/10/blog-post-two',
  component: ComponentCreator('/blog/2017/04/10/blog-post-two'),
  exact: true,
  
},
{
  path: '/blog/2017/09/25/testing-rss',
  component: ComponentCreator('/blog/2017/09/25/testing-rss'),
  exact: true,
  
},
{
  path: '/blog/2017/09/26/adding-rss',
  component: ComponentCreator('/blog/2017/09/26/adding-rss'),
  exact: true,
  
},
{
  path: '/blog/2017/10/24/new-version-1.0.0',
  component: ComponentCreator('/blog/2017/10/24/new-version-1.0.0'),
  exact: true,
  
},
{
  path: '/docs/:route',
  component: ComponentCreator('/docs/:route'),
  
  routes: [
{
  path: '/docs/api/actions',
  component: ComponentCreator('/docs/api/actions'),
  exact: true,
  
},
{
  path: '/docs/api/bundle',
  component: ComponentCreator('/docs/api/bundle'),
  exact: true,
  
},
{
  path: '/docs/api/create',
  component: ComponentCreator('/docs/api/create'),
  exact: true,
  
},
{
  path: '/docs/api/creator-keys',
  component: ComponentCreator('/docs/api/creator-keys'),
  exact: true,
  
},
{
  path: '/docs/api/leaf-reducers',
  component: ComponentCreator('/docs/api/leaf-reducers'),
  exact: true,
  
},
{
  path: '/docs/defaults/assign',
  component: ComponentCreator('/docs/defaults/assign'),
  exact: true,
  
},
{
  path: '/docs/defaults/clear',
  component: ComponentCreator('/docs/defaults/clear'),
  exact: true,
  
},
{
  path: '/docs/defaults/concat',
  component: ComponentCreator('/docs/defaults/concat'),
  exact: true,
  
},
{
  path: '/docs/defaults/do',
  component: ComponentCreator('/docs/defaults/do'),
  exact: true,
  
},
{
  path: '/docs/defaults/drop',
  component: ComponentCreator('/docs/defaults/drop'),
  exact: true,
  
},
{
  path: '/docs/defaults/filter',
  component: ComponentCreator('/docs/defaults/filter'),
  exact: true,
  
},
{
  path: '/docs/defaults/increment',
  component: ComponentCreator('/docs/defaults/increment'),
  exact: true,
  
},
{
  path: '/docs/defaults/off',
  component: ComponentCreator('/docs/defaults/off'),
  exact: true,
  
},
{
  path: '/docs/defaults/on',
  component: ComponentCreator('/docs/defaults/on'),
  exact: true,
  
},
{
  path: '/docs/defaults/overview',
  component: ComponentCreator('/docs/defaults/overview'),
  exact: true,
  
},
{
  path: '/docs/defaults/path',
  component: ComponentCreator('/docs/defaults/path'),
  exact: true,
  
},
{
  path: '/docs/defaults/push',
  component: ComponentCreator('/docs/defaults/push'),
  exact: true,
  
},
{
  path: '/docs/defaults/pushed-set',
  component: ComponentCreator('/docs/defaults/pushed-set'),
  exact: true,
  
},
{
  path: '/docs/defaults/reset',
  component: ComponentCreator('/docs/defaults/reset'),
  exact: true,
  
},
{
  path: '/docs/defaults/set',
  component: ComponentCreator('/docs/defaults/set'),
  exact: true,
  
},
{
  path: '/docs/defaults/toggle',
  component: ComponentCreator('/docs/defaults/toggle'),
  exact: true,
  
},
{
  path: '/docs/defaults/update',
  component: ComponentCreator('/docs/defaults/update'),
  exact: true,
  
},
{
  path: '/docs/examples/advanced-example',
  component: ComponentCreator('/docs/examples/advanced-example'),
  exact: true,
  
},
{
  path: '/docs/examples/basic-example',
  component: ComponentCreator('/docs/examples/basic-example'),
  exact: true,
  
},
{
  path: '/docs/examples/intermediate-example',
  component: ComponentCreator('/docs/examples/intermediate-example'),
  exact: true,
  
},
{
  path: '/docs/examples/usereducer-example',
  component: ComponentCreator('/docs/examples/usereducer-example'),
  exact: true,
  
},
{
  path: '/docs/intro/features',
  component: ComponentCreator('/docs/intro/features'),
  exact: true,
  
},
{
  path: '/docs/intro/overview',
  component: ComponentCreator('/docs/intro/overview'),
  exact: true,
  
},
{
  path: '/docs/motivation',
  component: ComponentCreator('/docs/motivation'),
  exact: true,
  
},
{
  path: '/docs/redux-leaves',
  component: ComponentCreator('/docs/redux-leaves'),
  exact: true,
  
}],
},
  
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
