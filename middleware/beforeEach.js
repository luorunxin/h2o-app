export default function ({route, redirect}) {
  if(route.fullPath === '' || route.fullPath === '/'){
    redirect('/home')
  }
}