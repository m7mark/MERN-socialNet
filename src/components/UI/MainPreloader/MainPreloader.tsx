import p from './MainPreloader.module.css'

export const MainPreloader: React.FC = () => {
    return <div className={p.container}>
        <div className={p.lds_ellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
}