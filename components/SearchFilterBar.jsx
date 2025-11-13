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
        <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 ${isRTL ? 'right-4' : 'left-4'}`} />
        <Input
          type="text"
          placeholder={isRTL ? 'ابحث في الأسئلة الصحية...' : 'Search health questions...'}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`medical-input h-14 text-lg border-2 border-slate-200 focus:border-primary focus:ring-0 focus:ring-primary/10 bg-white text-blue-900 placeholder:text-blue-400 ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'}`}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </div>

      {/* Filters */}
      <div className={`flex flex-wrap gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className={`medical-select w-60 h-12 border-2 border-slate-200 focus:border-primary bg-white text-blue-900 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Filter className={`w-5 h-5 text-blue-400 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            <SelectValue placeholder={isRTL ? 'التصنيف' : 'Category'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isRTL ? 'جميع التصنيفات' : 'All Categories'}</SelectItem>
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
            <SelectValue placeholder={isRTL ? 'ترتيب حسب' : 'Sort by'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">{isRTL ? 'الأحدث' : 'Most Recent'}</SelectItem>
            <SelectItem value="popular">{isRTL ? 'الأكثر شعبية' : 'Most Popular'}</SelectItem>
            <SelectItem value="answered">{isRTL ? 'تمت الإجابة عليه' : 'Most Answered'}</SelectItem>
            <SelectItem value="views">{isRTL ? 'الأكثر مشاهدة' : 'Most Viewed'}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
