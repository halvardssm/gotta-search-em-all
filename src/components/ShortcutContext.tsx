import React from 'react'

export type ShortcutContextType = {
    disableShortcuts: boolean
}

const ShortcutContext = React.createContext<ShortcutContextType>({ disableShortcuts: false })

export const ShortcutContextProvider: React.FC = ({ children }) => {
    const [disableShortcuts, setDisableShortcut] = React.useState(false)

    React.useEffect(() => {
        document.addEventListener('keydown', (ev) => {
            if (ev.ctrlKey && ev.keyCode === 77) {
                setDisableShortcut(!disableShortcuts)
            }
        })

        return () => {
            document.removeEventListener('keydown', () => { })
        }
    }, [disableShortcuts])

    console.log(disableShortcuts)

    const value = {
        disableShortcuts
    }

    return <ShortcutContext.Provider value={value} >{children}</ShortcutContext.Provider>
}

export const useShortcutContext = () => React.useContext(ShortcutContext)
