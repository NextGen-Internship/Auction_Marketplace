
interface ImportMetaEnv {
    VITE_BASE_URL: any
    readonly VITE_GOOGLE_CLIENT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}