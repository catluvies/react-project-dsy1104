import { noticiasData } from '../data/noticias'
import BlogHero from '../components/BlogHero'
import BlogLista from '../components/BlogLista'

function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogLista noticias={noticiasData} />
    </>
  )
}

export default BlogPage
