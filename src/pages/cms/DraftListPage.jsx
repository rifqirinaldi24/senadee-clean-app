import { useState, useEffect } from 'react';
import CMSHeader from '../../components/cms/CMSHeader';
import Toast from '../../components/ui/Toast';
import { getAllArticles, deleteArticle, saveArticle } from '../../data/articleStore';
import { addLog } from '../../data/logStore';
import { formatDate } from '../../data/articles';
import { useAuth } from '../../context/AuthContext';
import ArticleEditorPage from './ArticleEditorPage';

export default function DraftListPage() {
  const [drafts, setDrafts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [viewingArticle, setViewingArticle] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  
  // Publish states
  const [publishModal, setPublishModal] = useState(null);
  const [publishConfirmAcc, setPublishConfirmAcc] = useState(false);
  const [publishVerificationLink, setPublishVerificationLink] = useState('');
  const [publishMode, setPublishMode] = useState('now');
  const [publishDate, setPublishDate] = useState('');
  
  const { user } = useAuth();

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const refreshDrafts = () => {
    // Only show draft articles
    const allDrafts = getAllArticles().filter(a => a.status === 'draft');
    
    // RBAC: If user is Writer, they can only see their own drafts
    let filteredDrafts = allDrafts;
    if (user?.role === 'Writer' || user?.role === 'writer') {
      filteredDrafts = allDrafts.filter(a => a.author === user.name || (user.penName && a.author === user.penName));
    }
    
    setDrafts(filteredDrafts);
  };

  useEffect(() => {
    refreshDrafts();
  }, [user]);

  // ESC Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (publishModal) {
          handleClosePublish();
        } else if (deleteConfirm) {
          setDeleteConfirm(null);
        } else if (viewingArticle) {
          setViewingArticle(null);
          document.body.style.overflow = '';
        } else if (editingId) {
          setEditingId(null);
          document.body.style.overflow = '';
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteConfirm, viewingArticle, editingId, publishModal]);

  const handleOpenEditor = (id) => {
    setEditingId(id);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseEditor = (needsRefresh) => {
    setEditingId(null);
    document.body.style.overflow = '';
    if (needsRefresh) {
      refreshDrafts();
    }
  };

  const handleRowClick = (article) => {
    setViewingArticle(article);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseView = () => {
    setViewingArticle(null);
    document.body.style.overflow = '';
  };

  const handleRequestDelete = () => {
    setDeleteConfirm(viewingArticle);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      deleteArticle(deleteConfirm.id);
      refreshDrafts();
      setDeleteConfirm(null);
      setViewingArticle(null);
      document.body.style.overflow = '';
      showSuccess('Data Berhasil Dihapus');
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleDeleteFromTable = (id, e) => {
    e.stopPropagation();
    const article = drafts.find(a => a.id === id);
    if (article) {
      setViewingArticle(article);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleOpenPublish = (article, e) => {
    e.stopPropagation();
    setPublishModal(article);
    setPublishConfirmAcc(false);
    setPublishVerificationLink('');
    setPublishMode('now');
    setPublishDate('');
    document.body.style.overflow = 'hidden';
  };

  const handleClosePublish = () => {
    setPublishModal(null);
    document.body.style.overflow = '';
  };

  const handleConfirmPublish = () => {
    if (!publishModal) return;
    if (!publishConfirmAcc) return;
    if (!publishVerificationLink) return;

    const updatedArticle = {
      ...publishModal,
      isVerified: true, // Auto verified via Doctor ACC
      verificationLink: publishVerificationLink,
      status: publishMode === 'schedule' ? 'scheduled' : 'published',
      date: publishMode === 'schedule' ? (publishDate || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
      scheduledTimestamp: publishMode === 'schedule' ? new Date(publishDate).getTime() : Date.now()
    };

    saveArticle(updatedArticle);
    
    addLog({
      action: publishMode === 'schedule' ? 'Schedule Publish' : 'Publish',
      articleTitle: updatedArticle.title,
      actor: user?.name || 'Unknown',
      status: 'Success'
    });

    showSuccess(publishMode === 'schedule' ? 'Artikel Berhasil Dijadwalkan' : 'Artikel Berhasil Dipublish');
    handleClosePublish();
    refreshDrafts();
  };

  const filteredDrafts = drafts.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (article.articleId && article.articleId.toLowerCase().includes(searchTerm.toLowerCase())) ||
    article.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Toast message={successMsg} onClose={() => setSuccessMsg('')} />
      <CMSHeader title="Draft Artikel" subtitle="Manage your drafted content" />
      
      <div className="p-margin-mobile md:p-gutter max-w-container-max mx-auto w-full">
        
        {user?.role?.toLowerCase() === 'writer' && (
          <div className="mb-6 bg-secondary-container/30 border border-secondary-container text-on-surface-variant p-4 rounded-xl flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary">info</span>
            <p className="font-body-sm text-sm">
              Sebagai <b>Penulis (Writer)</b>, Anda hanya dapat melihat dan mengedit draf milik Anda sendiri.
            </p>
          </div>
        )}

        <div className="bg-surface-container-lowest rounded-xl border border-border-muted shadow-sm overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-border-muted flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface-container-low/30">
            <div className="relative w-full sm:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input
                type="text"
                placeholder="Cari Draf..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface border border-border-muted rounded-lg font-body-sm text-body-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-border-muted font-label-sm text-label-sm text-on-surface-variant">
                  <th className="p-4 font-semibold whitespace-nowrap">ID Draft</th>
                  <th className="p-4 font-semibold">Judul Topik</th>
                  <th className="p-4 font-semibold">Penulis</th>
                  <th className="p-4 font-semibold">Terakhir Diubah</th>
                  <th className="p-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface">
                {filteredDrafts.length > 0 ? (
                  filteredDrafts.map((article) => (
                    <tr 
                      key={article.id} 
                      onClick={() => handleRowClick(article)}
                      className="border-b border-border-muted last:border-b-0 hover:bg-senadee-canvas transition-colors cursor-pointer"
                    >
                      <td className="p-4 font-mono text-outline">{article.articleId || 'Menunggu'}</td>
                      <td className="p-4 max-w-xs truncate">
                        <p className="font-bold text-on-surface truncate" title={article.title}>{article.title || 'Untitled Draft'}</p>
                      </td>
                      <td className="p-4">{article.author}</td>
                      <td className="p-4">{formatDate(article.updatedAt || new Date().toISOString())}</td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                          <button onClick={(e) => handleOpenPublish(article, e)} className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-primary transition-colors cursor-pointer" title="Publish Draft">
                            <span className="material-symbols-outlined text-[18px]">publish</span>
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleOpenEditor(article.id); }} className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-senadee-light hover:text-primary transition-colors cursor-pointer" title="Edit Draft">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button onClick={(e) => handleDeleteFromTable(article.id, e)} className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-error transition-colors cursor-pointer" title="Delete Draft">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-on-surface-variant">
                      Tidak ada draf yang tersimpan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VIEW DETAIL MODAL (Read-Only, Card Modal) */}
      {viewingArticle && !deleteConfirm && !editingId && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in" onClick={handleCloseView}>
          <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-border-muted" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-muted bg-surface-container-low/50">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">edit_document</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Detail Draft</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant font-mono">{viewingArticle.articleId || 'Menunggu Publish'}</p>
                </div>
              </div>
              <button onClick={handleCloseView} className="p-1.5 rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body (Read-Only Content) */}
            <div className="p-6 overflow-y-auto flex-1">
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-3">{viewingArticle.title || 'Untitled Draft'}</h2>
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant mb-6 pb-4 border-b border-border-muted">
                <span className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[16px]">person</span> {viewingArticle.author}
                </span>
                <span className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span> {formatDate(viewingArticle.updatedAt || new Date().toISOString())}
                </span>
                <span className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[16px]">category</span> {viewingArticle.category || '-'}
                </span>
              </div>
              
              {/* Read-only content preview */}
              <div className="space-y-4">
                {viewingArticle.content?.map((sec, i) => (
                  <div key={i} className="bg-surface-container-low/30 rounded-xl p-4 border border-border-muted">
                    <h4 className="font-label-md text-label-md font-bold text-on-surface mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-primary-fixed text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      {sec.heading}
                    </h4>
                    <p className="text-on-surface-variant text-sm whitespace-pre-line leading-relaxed">{sec.text}</p>
                  </div>
                ))}
                {(!viewingArticle.content || viewingArticle.content.length === 0) && (
                  <p className="text-on-surface-variant italic text-center py-8">Tidak ada konten dalam draf ini.</p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-border-muted bg-surface-container-low/50 flex justify-between items-center">
              <button onClick={handleRequestDelete} className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-label-md text-label-md font-semibold hover:bg-red-700 transition-colors cursor-pointer flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">delete</span>
                Hapus Draft
              </button>
              <div className="flex gap-3">
                <button onClick={handleCloseView} className="px-5 py-2.5 border border-border-muted text-on-surface rounded-xl font-label-md text-label-md hover:bg-surface-container-low transition-colors cursor-pointer">
                  Tutup
                </button>
                <button onClick={() => { handleCloseView(); handleOpenEditor(viewingArticle.id); }} className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-semibold hover:bg-primary/90 transition-colors cursor-pointer flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Lanjutkan Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL (Card Modal) */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-sm border border-border-muted p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-error-container" style={{ fontSize: '32px' }}>warning</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Hapus Draft?</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-2">
              Apakah Anda yakin ingin menghapus:
            </p>
            <p className="font-label-md text-label-md font-bold text-on-surface mb-1">{deleteConfirm.title || 'Untitled Draft'}</p>
            <div className="flex gap-3 mt-6 justify-center">
              <button onClick={handleCancelDelete}
                className="px-5 py-2.5 border border-border-muted text-on-surface rounded-xl font-label-md text-label-md hover:bg-surface-container-low transition-colors cursor-pointer">
                Batal
              </button>
              <button onClick={handleConfirmDelete}
                className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-label-md text-label-md font-semibold hover:bg-red-700 transition-colors cursor-pointer">
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PUBLISH MODAL */}
      {publishModal && (
        <div className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={handleClosePublish}>
          <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-md border border-border-muted overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-muted bg-surface-container-low/50">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">rocket_launch</span>
                Publikasi Artikel
              </h3>
              <button onClick={handleClosePublish} className="p-1.5 rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              <div>
                <p className="font-label-md text-label-md font-bold text-on-surface mb-1">Judul Artikel:</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">{publishModal.title}</p>
              </div>

              {/* URL Bukti Verification */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">link</span>
                  Link Bukti Verifikasi *
                </label>
                <input 
                  type="url" 
                  value={publishVerificationLink}
                  onChange={(e) => setPublishVerificationLink(e.target.value)}
                  placeholder="URL Google Docs hasil review Dokter"
                  className="w-full bg-surface border border-outline-variant rounded-lg font-body-md text-body-md p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Toggle ACC */}
              <div className={`p-4 rounded-xl border ${publishVerificationLink ? 'bg-primary-fixed/30 border-primary-container' : 'bg-surface-dim border-border-muted opacity-60'} flex items-center justify-between gap-4 transition-all`}>
                <div className="flex-1">
                  <label className="font-label-md text-label-md text-on-surface block mb-1 font-bold" htmlFor="accVerified">
                    ACC Dokter
                  </label>
                  <p className="font-body-sm text-[12px] text-on-surface-variant leading-tight">
                    Saya mengonfirmasi artikel ini telah di-ACC Dokter melalui link di atas.
                  </p>
                </div>
                <div className="relative inline-block w-12 flex-shrink-0 align-middle select-none transition duration-200 ease-in mt-1">
                  <input
                    type="checkbox"
                    id="accVerified"
                    checked={publishConfirmAcc}
                    disabled={!publishVerificationLink}
                    onChange={(e) => setPublishConfirmAcc(e.target.checked)}
                    className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none z-10 transition-transform duration-200 ${!publishVerificationLink ? 'cursor-not-allowed opacity-60' : 'cursor-pointer border-border-muted'}`}
                    style={publishConfirmAcc ? { right: 0, borderColor: '#006a69' } : {}}
                  />
                  <label
                    htmlFor="accVerified"
                    className={`toggle-label block overflow-hidden h-6 rounded-full transition-colors ${!publishVerificationLink ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                    style={publishConfirmAcc ? { backgroundColor: '#0ea5a4' } : { backgroundColor: '#e2e7ff' }}
                  ></label>
                </div>
              </div>

              {/* Publish Mode */}
              <div className="flex flex-col gap-3">
                <label className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
                  Jadwal Tayang
                </label>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPublishMode('now')}>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${publishMode === 'now' ? 'border-primary' : 'border-outline-variant'}`}>
                    {publishMode === 'now' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface">Publish Sekarang</span>
                </div>
                
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPublishMode('schedule')}>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${publishMode === 'schedule' ? 'border-primary' : 'border-outline-variant'}`}>
                    {publishMode === 'schedule' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface">Terjadwal</span>
                </div>

                {publishMode === 'schedule' && (
                  <input 
                    type="datetime-local" 
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="mt-2 w-full bg-surface border border-outline-variant rounded-lg font-body-sm text-body-sm p-3 focus:ring-2 focus:ring-primary outline-none"
                  />
                )}
              </div>

            </div>

            <div className="px-6 py-4 border-t border-border-muted bg-surface-container-low/50 flex justify-end gap-3">
              <button onClick={handleClosePublish} className="px-5 py-2.5 border border-border-muted text-on-surface rounded-xl font-label-md text-label-md hover:bg-surface-container-low transition-colors cursor-pointer">
                Batal
              </button>
              <button 
                onClick={handleConfirmPublish} 
                disabled={!publishConfirmAcc || !publishVerificationLink || (publishMode === 'schedule' && !publishDate)}
                className={`px-5 py-2.5 rounded-xl font-label-md text-label-md font-semibold flex items-center gap-2 transition-colors ${
                  publishConfirmAcc && publishVerificationLink && (publishMode === 'now' || publishDate)
                    ? 'bg-primary text-on-primary hover:bg-primary/90 cursor-pointer'
                    : 'bg-surface-dim text-on-surface-variant cursor-not-allowed opacity-50'
                }`}
              >
                Konfirmasi & Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CARD EDITOR MODAL */}
      {editingId && !viewingArticle && !deleteConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => handleCloseEditor(false)}>
          <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] border border-border-muted overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <ArticleEditorPage isModal={true} editId={editingId} onClose={handleCloseEditor} />
          </div>
        </div>
      )}
    </>
  );
}
