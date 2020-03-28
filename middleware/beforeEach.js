import Storage from '~/utils/storage.js'
export default function ({route, redirect}) {
  console.log(route)
  if(route.fullPath === '' || route.fullPath === '/'){
    redirect('/home')
  }
  if (route.path === '/my' || route.path === '/information' || route.path === '/service') {
    let user_info = Storage.getLocal('user_info')
    if(!user_info){
      Storage.setLocal('go_path', {path: route.path})
      redirect('/login')
    }
  }
}
