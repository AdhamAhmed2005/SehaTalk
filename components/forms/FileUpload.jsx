"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export default function FileUpload({ attachments, setAttachments }) {
  const { t, isRTL } = useLanguage();
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf';
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });
    
    setAttachments(prev => [...prev, ...validFiles].slice(0, 3));
  };

  const removeFile = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
      <label className="text-sm font-medium text-gray-700 block">
        {t('form.attachments')} 
        <span className="text-gray-500 text-xs">({t('form.optional')})</span>
      </label>
      
      <Card
        className={`border-2 border-dashed transition-colors shadow-sm ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-primary bg-white'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8">
          <div className="text-center">
            <Upload className="mx-auto h-10 w-10 text-blue-500 mb-3" />
            <div className="text-base font-semibold text-blue-900 mb-2">
              {t('form.dragDropFiles')}
            </div>
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('file-upload').click()}
              className={`text-primary border-primary hover:bg-blue-50 font-bold shadow-sm ${isRTL ? 'ml-2' : 'mr-2'}`}
            >
              {t('form.selectFiles')}
            </Button>
            <p className="text-xs text-blue-700 mt-3">
              {t('form.fileTypes')}
            </p>
          </div>
        </CardContent>
      </Card>

      {attachments.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            {t('form.selectedFiles')}
          </p>
          {attachments.map((file, index) => (
            <div key={index} className={`flex items-center justify-between p-2 bg-gray-50 rounded border ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'}`}>
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700 truncate max-w-[200px]">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500">
                  ({Math.round(file.size / 1024)}KB)
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}