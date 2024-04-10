import { Layout } from 'antd'
import BreadcrumbNav from './components/BreadcrumbNav'
import CollapsIcon from './components/CollapsIcon'
import LanguageChange from './components/LanguageChange'
import Theme from './components/Theme'
import Fullscreen from './components/Fullscreen'
import AvatarIcon from './components/AvatarIcon'

// css
import styles from './index.module.scss'

const { Header } = Layout

const HeaderLayout = () => {
  return (
    <Header className={styles.layoutHeader} style={{ padding: 0 }}>
      <div className='header-lf'>
        {/* collaps icon */}
        <CollapsIcon />
        {/* breadcrumb nav */}
        <BreadcrumbNav />
      </div>
      <div className='header-ri'>
        {/* select language */}
        <LanguageChange />
        {/* select them */}
        <Theme />
        {/* select full screen */}
        <Fullscreen />
        {/* avatar */}
        <AvatarIcon />
      </div>
    </Header>
  )
}

export default HeaderLayout
