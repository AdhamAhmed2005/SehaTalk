"use client";

import { Search, Filter } from 'lucide-react';
import { Input } from './ui/input.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select.jsx';
import { useLanguage } from '../lib/i18n/LanguageProvider';

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  onSearchKeyDown,
  onSearchIconClick,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  const { t, isRTL } = useLanguage();

  return (
    <div className="medical-card p-8 space-y-6 border-0">
      {/* Search */}
      <div className="relative">
        <Input
          type="text"
          placeholder={t('explore.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={onSearchKeyDown}
          className={`medical-input h-14 text-lg border-2 border-slate-200 focus:border-primary focus:ring-0 focus:ring-primary/10 bg-white text-blue-900 placeholder:text-blue-400 ${isRTL ? 'pr-14 text-right' : 'pl-14 text-left'}`}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
        <button
          type="button"
          aria-label={t('explore.searchButton')}
          onClick={onSearchIconClick}
          className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-5' : 'right-5'} bg-transparent border-none p-0 m-0 cursor-pointer flex items-center justify-center`}
          style={{outline: 'none'}}
        >
          <Search className="w-6 h-6 text-blue-500 hover:text-primary transition" />
        </button>
      </div>

      {/* Filters */}
      <div className={`flex flex-wrap gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className={`medical-select w-60 h-12 border-2 border-slate-200 focus:border-primary bg-white text-blue-900 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Filter className={`w-5 h-5 text-blue-400 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            <SelectValue placeholder={t('explore.categoryPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('categories.all')}</SelectItem>
            <SelectItem value="general-health">{t('categories.general-health')}</SelectItem>
            <SelectItem value="cardiology">{t('categories.cardiology')}</SelectItem>
            <SelectItem value="dermatology">{t('categories.dermatology')}</SelectItem>
            <SelectItem value="pediatrics">{t('categories.pediatrics')}</SelectItem>
            <SelectItem value="orthopedics">{t('categories.orthopedics')}</SelectItem>
            <SelectItem value="psychiatry">{t('categories.psychiatry')}</SelectItem>
            <SelectItem value="gastroenterology">{t('categories.gastroenterology')}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className={`medical-select w-52 h-12 border-2 border-slate-200 focus:border-primary bg-white text-blue-900 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <SelectValue placeholder={t('explore.sortPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">{t('explore.sort.recent')}</SelectItem>
            <SelectItem value="popular">{t('explore.sort.popular')}</SelectItem>
            <SelectItem value="answered">{t('explore.sort.answered')}</SelectItem>
            <SelectItem value="views">{t('explore.sort.views')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
