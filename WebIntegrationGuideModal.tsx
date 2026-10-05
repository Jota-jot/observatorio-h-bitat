import React, { useState } from 'react';
import { X, Copy, Check, Globe, Server } from 'lucide-react';

interface WebIntegrationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebIntegrationGuideModal: React.FC<WebIntegrationGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const appOrigin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://observatorio.habitatasistencial.es';

  const iframeSnippet = `<iframe
  src="${appOrigin}"
  title="Observatorio y Configurador de Prevención — Hábitat Asistencial AssureCareWare"
  style="width: 100%; min-height: 920px; border: 0; border-radius: 12px;"
  loading="lazy"
></iframe>`;

  const vercelRewriteSnippet = `{
  "rewrites": [
    {
      "source": "/observatorio/:path*",
      "destination": "${appOrigin}/:path*"
    }
  ]
}`;

  const gitPushOtherProfileSnippet = `# 1. Descomprime el ZIP descargado desde AI Studio y entra en la carpeta:
cd habitat-asistencial-observatorio-domus

# 2. Inicializa Git y guarda todos los archivos:
git init
git add .
git commit -m "feat: Observatorio Domus - Hábitat Asistencial AssureCareWare"
git branch -M main

# 3. Conecta con el repositorio del OTRO perfil de GitHub y súbelo:
git remote add origin https://github.com/OTRO_USUARIO/observatorio-habitat-asistencial.git
git push -u origin main`;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A1D37]/65 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#F8FAFC] border border-slate-300 border-t-4 border-t-[#0088CE] max-w-3xl w-full p-6 sm:p-8 shadow-xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0088CE] font-semibold">
            <Globe className="w-4 h-4" />
            <span>Guía Técnica de Despliegue · habitatasistencial.es</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-[#0A1D37]"
            aria-label="Cerrar guía de integración"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-2xl font-editorial text-[#0A1D37] mt-4">
          Cómo integrar esta plataforma en habitatasistencial.es y optimizar tu DNS
        </h3>

        <div className="space-y-6 mt-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Diagnostic of the user's GoDaddy screenshot */}
          <div className="p-4 bg-white border border-slate-200 border-l-4 border-l-[#14A88B]">
            <strong className="text-[#0A1D37] block mb-1">
              1. Diagnóstico de tu captura de DNS (Reenvío 301 a Vercel):
            </strong>
            <p className="text-xs text-slate-600">
              Actualmente tienes configurado un <strong>Reenvío 301</strong> de{' '}
              <code className="font-mono-tabular text-[#0088CE]">www.habitatasistencial.es</code> hacia{' '}
              <code className="font-mono-tabular text-[#0A1D37]">
                https://habitat-asistencial-web-gkxm.vercel.app
              </code>
              . Con el «Reenvío», cuando un cliente entra a tu dominio, el navegador cambia la dirección y muestra{' '}
              <code className="font-mono-tabular">.vercel.app</code> en lugar de mantener tu marca{' '}
              <code className="font-mono-tabular">habitatasistencial.es</code>.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-[#0A1D37]">
              <strong>Recomendación profesional:</strong> En vez de usar la pestaña «Reenvío», entra en Vercel → <em>Settings → Domains</em>, añade{' '}
              <code className="font-mono-tabular">habitatasistencial.es</code> y en la pestaña{' '}
              <strong>«Registros DNS»</strong> de tu proveedor añade:
              <ul className="list-disc pl-5 mt-1.5 space-y-1 font-mono-tabular text-xs">
                <li>
                  Tipo <strong>A</strong> · Nombre <strong>@</strong> · Valor{' '}
                  <strong>76.76.21.21</strong>
                </li>
                <li>
                  Tipo <strong>CNAME</strong> · Nombre <strong>www</strong> · Valor{' '}
                  <strong>cname.vercel-dns.com</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* Option A: Subdomain or Route */}
          <div className="p-4 bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-[#0A1D37]">
                2. Integración por Ruta en tu proyecto Vercel actual (/observatorio)
              </strong>
              <button
                type="button"
                onClick={() => copyText(vercelRewriteSnippet, 'vercel')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-[#0088CE] hover:text-white rounded transition-colors"
              >
                {copiedKey === 'vercel' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'vercel' ? 'Copiado' : 'Copiar vercel.json'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-2">
              Añade este bloque en el archivo <code className="font-mono-tabular">vercel.json</code> de tu repositorio{' '}
              <code className="font-mono-tabular">habitat-asistencial-web</code> para que{' '}
              <code className="font-mono-tabular">habitatasistencial.es/observatorio</code> cargue esta herramienta directamente sin cambiar de dominio:
            </p>
            <pre className="p-3 bg-[#0A1D37] text-slate-100 text-xs font-mono-tabular overflow-x-auto rounded">
              {vercelRewriteSnippet}
            </pre>
          </div>

          {/* Option B: Embed Iframe */}
          <div className="p-4 bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-[#0A1D37]">
                3. O incrustar directamente como sección interactiva (Código HTML / React)
              </strong>
              <button
                type="button"
                onClick={() => copyText(iframeSnippet, 'iframe')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-[#0088CE] hover:text-white rounded transition-colors"
              >
                {copiedKey === 'iframe' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'iframe' ? 'Copiado' : 'Copiar HTML'}</span>
              </button>
            </div>
            <pre className="p-3 bg-[#0A1D37] text-slate-100 text-xs font-mono-tabular overflow-x-auto rounded">
              {iframeSnippet}
            </pre>
          </div>

          {/* Option C: Share or Push to Another GitHub Profile */}
          <div className="p-4 bg-white border border-slate-200 border-l-4 border-l-[#0088CE]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <strong className="text-[#0A1D37]">
                4. Compartir o subir el proyecto a otro perfil de GitHub
              </strong>
              <div className="flex items-center gap-2">
                <a
                  href="/observatorio-habitat-asistencial.zip"
                  download="observatorio-habitat-asistencial.zip"
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-[#0088CE] text-white hover:bg-[#0A1D37] rounded transition-colors"
                >
                  <span>Descargar .ZIP (961 KB)</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyText(gitPushOtherProfileSnippet, 'github')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-[#0088CE] hover:text-white rounded transition-colors"
                >
                  {copiedKey === 'github' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'github' ? 'Copiado' : 'Copiar comandos Git'}</span>
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-2">
              Puedes descargar el ZIP desde el icono superior de AI Studio (<em>Download app</em>) y subirlo a cualquier otra cuenta de GitHub con estos comandos, o bien en GitHub ir a <em>Settings → Collaborators</em> (para invitar al otro perfil) o <em>Settings → Transfer ownership</em> (para transferirle el repositorio):
            </p>
            <pre className="p-3 bg-[#0A1D37] text-slate-100 text-xs font-mono-tabular overflow-x-auto rounded">
              {gitPushOtherProfileSnippet}
            </pre>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A1D37] rounded-lg hover:bg-[#0088CE] transition-colors"
          >
            Entendido, cerrar guía
          </button>
        </div>
      </div>
    </div>
  );
};
