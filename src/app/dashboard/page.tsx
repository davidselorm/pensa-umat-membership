'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Phone,
  MessageSquare,
  CheckSquare,
  Square,
  Edit,
  Trash2,
  Plus,
  Building,
  Building2,
  UserCheck,
  UserX,
  X,
  Check,
  ChevronDown,
  Layers,
  GraduationCap,
  Calendar,
  Home,
  RefreshCw,
  ExternalLink,
  Info,
  Loader2,
  UserPlus
} from 'lucide-react';
import {
  Member,
  FamilyUnit,
  DashboardStats,
  YEAR_LEVELS,
  MEMBERSHIP_STATUSES,
  CHURCH_DEPARTMENTS,
  SUGGESTED_HOSTELS
} from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();

  // Auth & Page State
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'directory' | 'family_units' | 'analytics'>('directory');

  // Data
  const [members, setMembers] = useState<Member[]>([]);
  const [familyUnits, setFamilyUnits] = useState<FamilyUnit[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [hostelFilter, setHostelFilter] = useState('ALL');
  const [programmeFilter, setProgrammeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [familyFilter, setFamilyFilter] = useState('ALL');

  // Bulk Selection
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkTargetUnit, setBulkTargetUnit] = useState<string>('');
  const [bulkLoading, setBulkLoading] = useState(false);

  // Member Detail / Edit Drawer
  const [viewingMember, setViewingMember] = useState<Member | null>(null);
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Member>>({});
  const [savingMember, setSavingMember] = useState(false);

  // Family Unit Create / Edit Modal
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [editingFamilyUnit, setEditingFamilyUnit] = useState<FamilyUnit | null>(null);
  const [familyForm, setFamilyForm] = useState({ name: '', leader_name: '', leader_phone: '', meeting_info: '' });
  const [savingFamily, setSavingFamily] = useState(false);

  // Feedback Notification
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    try {
      setLoading(true);
      const authRes = await fetch('/api/auth/me');
      if (!authRes.ok) {
        router.push('/login');
        return;
      }
      await Promise.all([loadStats(), loadFamilyUnits(), loadMembers()]);
    } catch (err) {
      console.error(err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const showNotice = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const loadFamilyUnits = async () => {
    try {
      const res = await fetch('/api/family-units');
      if (res.ok) {
        const data = await res.json();
        setFamilyUnits(data.units || []);
      }
    } catch (err) {
      console.error('Failed to load family units:', err);
    }
  };

  const loadMembers = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (levelFilter !== 'ALL') params.set('level', levelFilter);
      if (hostelFilter !== 'ALL') params.set('hostel', hostelFilter);
      if (programmeFilter !== 'ALL') params.set('programme', programmeFilter);
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      if (deptFilter !== 'ALL') params.set('department', deptFilter);
      if (familyFilter !== 'ALL') params.set('familyUnit', familyFilter);

      const res = await fetch(`/api/members?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setMembers(data.members || []);
      }
    } catch (err) {
      console.error('Failed to load members:', err);
    }
  };

  // Reload when filters change
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        loadMembers();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, levelFilter, hostelFilter, programmeFilter, statusFilter, deptFilter, familyFilter]);

  // Bulk selection helpers
  const handleSelectAll = () => {
    if (selectedMemberIds.length === members.length) {
      setSelectedMemberIds([]);
    } else {
      setSelectedMemberIds(members.map((m) => m.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedMemberIds.includes(id)) {
      setSelectedMemberIds(selectedMemberIds.filter((item) => item !== id));
    } else {
      setSelectedMemberIds([...selectedMemberIds, id]);
    }
  };

  const handleBulkAssign = async () => {
    if (!bulkTargetUnit) {
      alert('Please select a Family Unit to assign, or choose Unassigned.');
      return;
    }
    setBulkLoading(true);
    try {
      const res = await fetch('/api/members/bulk-assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberIds: selectedMemberIds,
          familyUnitId: bulkTargetUnit,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showNotice(data.message || 'Members assigned successfully');
      setShowBulkModal(false);
      setSelectedMemberIds([]);
      await Promise.all([loadMembers(), loadStats(), loadFamilyUnits()]);
    } catch (err: any) {
      showNotice(err.message || 'Bulk assignment failed', 'error');
    } finally {
      setBulkLoading(false);
    }
  };

  // Export to CSV
  const handleExportCsv = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (levelFilter !== 'ALL') params.set('level', levelFilter);
    if (hostelFilter !== 'ALL') params.set('hostel', hostelFilter);
    if (programmeFilter !== 'ALL') params.set('programme', programmeFilter);
    if (statusFilter !== 'ALL') params.set('status', statusFilter);
    if (deptFilter !== 'ALL') params.set('department', deptFilter);
    if (familyFilter !== 'ALL') params.set('familyUnit', familyFilter);

    window.open(`/api/export?${params.toString()}`, '_blank');
  };

  // WhatsApp link formatter (handles 024... -> 23324...)
  const getWhatsAppLink = (phone: string, name: string) => {
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.startsWith('0') && clean.length === 10) {
      clean = '233' + clean.substring(1);
    }
    const message = encodeURIComponent(`Hi ${name}, warm Christian greetings from PENSA UMaT Secretariat!`);
    return `https://wa.me/${clean}?text=${message}`;
  };

  // Member Edit / Save
  const startEditMember = (member: Member) => {
    setEditForm({ ...member });
    setIsEditingMember(true);
  };

  const handleSaveMember = async () => {
    if (!viewingMember) return;
    setSavingMember(true);
    try {
      const res = await fetch(`/api/members/${viewingMember.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showNotice('Member updated successfully');
      setIsEditingMember(false);
      // Update local member
      const updated = { ...viewingMember, ...editForm } as Member;
      if (editForm.family_unit_id) {
        const u = familyUnits.find((f) => f.id === editForm.family_unit_id);
        updated.family_unit_name = u ? u.name : null;
      } else if (editForm.family_unit_id === '') {
        updated.family_unit_name = null;
      }
      setViewingMember(updated);
      await Promise.all([loadMembers(), loadStats(), loadFamilyUnits()]);
    } catch (err: any) {
      showNotice(err.message || 'Failed to update member', 'error');
    } finally {
      setSavingMember(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member record? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/members/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotice('Member removed successfully');
        setViewingMember(null);
        await Promise.all([loadMembers(), loadStats(), loadFamilyUnits()]);
      }
    } catch (err: any) {
      showNotice(err.message || 'Failed to delete member', 'error');
    }
  };

  // Family Unit Save / Delete
  const openNewFamilyModal = () => {
    setEditingFamilyUnit(null);
    setFamilyForm({ name: '', leader_name: '', leader_phone: '', meeting_info: '' });
    setShowFamilyModal(true);
  };

  const openEditFamilyModal = (unit: FamilyUnit) => {
    setEditingFamilyUnit(unit);
    setFamilyForm({
      name: unit.name,
      leader_name: unit.leader_name,
      leader_phone: unit.leader_phone,
      meeting_info: unit.meeting_info || '',
    });
    setShowFamilyModal(true);
  };

  const handleSaveFamilyUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingFamily(true);
    try {
      if (editingFamilyUnit) {
        const res = await fetch(`/api/family-units/${editingFamilyUnit.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(familyForm),
        });
        if (!res.ok) throw new Error('Failed to update family unit');
        showNotice('Family unit updated');
      } else {
        const res = await fetch('/api/family-units', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(familyForm),
        });
        if (!res.ok) throw new Error('Failed to create family unit');
        showNotice('Family unit created');
      }
      setShowFamilyModal(false);
      await Promise.all([loadFamilyUnits(), loadMembers(), loadStats()]);
    } catch (err: any) {
      showNotice(err.message || 'Error saving family unit', 'error');
    } finally {
      setSavingFamily(false);
    }
  };

  const handleDeleteFamilyUnit = async (id: string) => {
    if (!confirm('Are you sure you want to delete this Family Unit? Any members assigned to it will become Unassigned.')) return;
    try {
      const res = await fetch(`/api/family-units/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotice('Family Unit deleted');
        await Promise.all([loadFamilyUnits(), loadMembers(), loadStats()]);
      }
    } catch (err: any) {
      showNotice(err.message || 'Failed to delete unit', 'error');
    }
  };

  // Unique programmes for filter dropdown
  const uniqueProgrammes = useMemo(() => {
    const set = new Set<string>();
    members.forEach((m) => {
      if (m.programme) set.add(m.programme);
    });
    return Array.from(set).sort();
  }, [members]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 bg-slate-50">
        <div className="text-center space-y-3">
          <Loader2 className="w-10 h-10 animate-spin text-[#0F294A] mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Loading PENSA UMaT Secretariat Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm font-medium animate-in slide-in-from-bottom-5 ${
            notification.type === 'success'
              ? 'bg-[#0F294A] text-white border border-amber-400/40'
              : 'bg-red-600 text-white'
          }`}
        >
          {notification.type === 'success' ? <Check className="w-4 h-4 text-amber-400" /> : <Info className="w-4 h-4" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F294A] tracking-tight">
              Executive Admin Dashboard
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
              SECRETARIAT
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Membership records, contact outreach, and Family Unit cell management
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => {
              loadMembers();
              loadStats();
              loadFamilyUnits();
              showNotice('Data refreshed');
            }}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shadow-sm transition-all"
            title="Refresh Directory"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0F294A] font-semibold text-xs sm:text-sm shadow-sm flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={openNewFamilyModal}
            className="px-4 py-2.5 rounded-xl bg-[#0F294A] hover:bg-[#153A68] text-white font-semibold text-xs sm:text-sm shadow flex items-center gap-2 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>New Family Unit</span>
          </button>
        </div>
      </div>

      {/* 1. Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Total Registered Members */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Members</span>
            <Users className="w-5 h-5 text-[#0F294A]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0F294A]">{stats?.totalMembers || 0}</div>
          <p className="text-[11px] text-slate-400 mt-1">Registered students</p>
        </div>

        {/* Pentecost Members */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pentecost</span>
            <UserCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">{stats?.pentecostCount || 0}</div>
          <p className="text-[11px] text-slate-400 mt-1">COP baptized/members</p>
        </div>

        {/* Associates Count */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Associates</span>
            <UserPlus className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">{stats?.associateCount || 0}</div>
          <p className="text-[11px] text-slate-400 mt-1">Associate brothers/sisters</p>
        </div>

        {/* Unassigned Members */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 bg-amber-50/40 shadow-sm">
          <div className="flex items-center justify-between text-amber-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Unassigned</span>
            <UserX className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-700">{stats?.unassignedCount || 0}</div>
          <p className="text-[11px] text-amber-800/80 mt-1">Need Family Unit grouping</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 mb-6 gap-2">
        <button
          onClick={() => setActiveTab('directory')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'directory'
              ? 'border-[#0F294A] text-[#0F294A]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Members Directory ({members.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('family_units')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'family_units'
              ? 'border-[#0F294A] text-[#0F294A]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Family Units & Home Cells ({familyUnits.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'analytics'
              ? 'border-[#0F294A] text-[#0F294A]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Demographics & Breakdown</span>
        </button>
      </div>

      {/* ===================== TAB 1: MEMBERS DIRECTORY ===================== */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          {/* 2. Search & Multi-Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            {/* Live Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search live by Full Name or Phone Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50 focus:bg-white focus:border-[#0F294A] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Simultaneous Filter Dropdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1 text-xs">
              {/* Year Level */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Year Level</label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 outline-none focus:border-[#0F294A]"
                >
                  <option value="ALL">All Levels</option>
                  {YEAR_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              {/* Hostel */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Hostel / Hall</label>
                <select
                  value={hostelFilter}
                  onChange={(e) => setHostelFilter(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 outline-none focus:border-[#0F294A]"
                >
                  <option value="ALL">All Hostels</option>
                  <option value="Chamber of Mines">Chamber of Mines Hall</option>
                  <option value="Gold Refinery">Gold Refinery Hall</option>
                  <option value="KT Hall">KT Hall</option>
                  <option value="Off-Campus">Off-Campus Hostels</option>
                </select>
              </div>

              {/* Membership Status */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 outline-none focus:border-[#0F294A]"
                >
                  <option value="ALL">All Statuses</option>
                  {MEMBERSHIP_STATUSES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Department</label>
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 outline-none focus:border-[#0F294A]"
                >
                  <option value="ALL">All Departments</option>
                  {CHURCH_DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Family Unit */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Family Unit</label>
                <select
                  value={familyFilter}
                  onChange={(e) => setFamilyFilter(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 outline-none focus:border-[#0F294A]"
                >
                  <option value="ALL">All Units</option>
                  <option value="UNASSIGNED">Unassigned Only</option>
                  {familyUnits.map((u) => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>

              {/* Reset Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setLevelFilter('ALL');
                    setHostelFilter('ALL');
                    setProgrammeFilter('ALL');
                    setStatusFilter('ALL');
                    setDeptFilter('ALL');
                    setFamilyFilter('ALL');
                  }}
                  className="w-full p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs flex items-center justify-center gap-1 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Action Bar (when members selected) */}
          {selectedMemberIds.length > 0 && (
            <div className="bg-[#0F294A] text-white p-3 sm:p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-semibold bg-white/20 px-2.5 py-1 rounded-lg">
                  {selectedMemberIds.length} member{selectedMemberIds.length > 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={() => setSelectedMemberIds([])}
                  className="text-xs text-slate-300 hover:text-white underline"
                >
                  Clear Selection
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBulkModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg text-xs sm:text-sm shadow transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Building className="w-4 h-4" />
                  Assign to Family Unit
                </button>
              </div>
            </div>
          )}

          {/* Directory Content: Desktop Table & Mobile Cards */}
          {members.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-700">No Members Match Your Filter</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                Try clearing your search query or adjusting the filters above.
              </p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE VIEW (hidden on mobile) */}
              <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4 w-10">
                          <button
                            onClick={handleSelectAll}
                            className="text-slate-400 hover:text-[#0F294A]"
                            title="Select All"
                          >
                            {selectedMemberIds.length === members.length && members.length > 0 ? (
                              <CheckSquare className="w-4 h-4 text-[#0F294A]" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </th>
                        <th className="py-3 px-4">Member Name</th>
                        <th className="py-3 px-4">Phone / WhatsApp</th>
                        <th className="py-3 px-4">Level & Programme</th>
                        <th className="py-3 px-4">Hostel</th>
                        <th className="py-3 px-4">Department</th>
                        <th className="py-3 px-4">Family Unit</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {members.map((member) => {
                        const isSelected = selectedMemberIds.includes(member.id);
                        return (
                          <tr
                            key={member.id}
                            className={`hover:bg-blue-50/40 transition-colors ${
                              isSelected ? 'bg-amber-50/50' : ''
                            }`}
                          >
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => handleToggleSelect(member.id)}
                                className="text-slate-400 hover:text-[#0F294A]"
                              >
                                {isSelected ? (
                                  <CheckSquare className="w-4 h-4 text-[#0F294A]" />
                                ) : (
                                  <Square className="w-4 h-4" />
                                )}
                              </button>
                            </td>

                            {/* Full Name & Status Badge */}
                            <td className="py-3.5 px-4">
                              <div
                                onClick={() => setViewingMember(member)}
                                className="font-bold text-[#0F294A] cursor-pointer hover:underline flex items-center gap-1.5"
                              >
                                <span>{member.full_name}</span>
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span
                                  className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                                    member.membership_status === 'Pentecost Member'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                                  }`}
                                >
                                  {member.membership_status}
                                </span>
                              </div>
                            </td>

                            {/* Phone with One-Tap Actions */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="font-mono text-xs text-slate-700 font-semibold">{member.phone}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <a
                                  href={`tel:${member.phone}`}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-[#0F294A] text-[11px] font-semibold border border-blue-200"
                                  title="Call member"
                                >
                                  <Phone className="w-3 h-3 text-blue-600" />
                                  <span>Call</span>
                                </a>
                                <a
                                  href={getWhatsAppLink(member.phone, member.full_name)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold border border-emerald-200"
                                  title="WhatsApp member"
                                >
                                  <MessageSquare className="w-3 h-3 text-emerald-600" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </td>

                            {/* Level & Programme */}
                            <td className="py-3.5 px-4 max-w-xs">
                              <span className="inline-block px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold mr-1.5">
                                {member.year_level}
                              </span>
                              <span className="text-slate-600 text-xs truncate block mt-0.5" title={member.programme}>
                                {member.programme}
                              </span>
                            </td>

                            {/* Hostel */}
                            <td className="py-3.5 px-4 text-slate-700 text-xs">
                              <div className="flex items-center gap-1">
                                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span>{member.hostel}</span>
                              </div>
                            </td>

                            {/* Department */}
                            <td className="py-3.5 px-4 text-xs font-semibold text-[#0F294A]">
                              <span className="bg-slate-100 px-2 py-1 rounded-md">
                                {member.department}
                              </span>
                            </td>

                            {/* Family Unit */}
                            <td className="py-3.5 px-4">
                              {member.family_unit_name ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0F294A] border border-blue-200">
                                  <Building className="w-3 h-3 text-amber-500" />
                                  {member.family_unit_name}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                                  Unassigned
                                </span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => setViewingMember(member)}
                                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-[#0F294A] hover:text-white text-slate-700 transition-colors"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MOBILE CARDS VIEW (optimized for phones) */}
              <div className="lg:hidden space-y-3">
                <div className="flex items-center justify-between px-1 text-xs text-slate-500">
                  <span>Showing {members.length} members</span>
                  <button onClick={handleSelectAll} className="font-semibold text-[#0F294A]">
                    {selectedMemberIds.length === members.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>

                {members.map((member) => {
                  const isSelected = selectedMemberIds.includes(member.id);
                  return (
                    <div
                      key={member.id}
                      className={`bg-white rounded-2xl p-4 border transition-all shadow-sm ${
                        isSelected ? 'border-[#0F294A] ring-2 ring-blue-100' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <button
                            onClick={() => handleToggleSelect(member.id)}
                            className="mt-1 text-slate-400"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-5 h-5 text-[#0F294A]" />
                            ) : (
                              <Square className="w-5 h-5" />
                            )}
                          </button>
                          <div>
                            <h3
                              onClick={() => setViewingMember(member)}
                              className="font-bold text-base text-[#0F294A] active:underline cursor-pointer"
                            >
                              {member.full_name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-slate-500">
                              <span className="font-bold text-slate-700">{member.year_level}</span>
                              <span>&bull;</span>
                              <span className="truncate max-w-[200px]">{member.programme}</span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                            member.membership_status === 'Pentecost Member'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {member.membership_status === 'Pentecost Member' ? 'Pentecost' : 'Associate'}
                        </span>
                      </div>

                      {/* Location & Dept */}
                      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold uppercase">Hostel</span>
                          <span className="font-medium text-slate-700">{member.hostel}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold uppercase">Department</span>
                          <span className="font-medium text-[#0F294A]">{member.department}</span>
                        </div>
                      </div>

                      {/* Family Unit Badge */}
                      <div className="mt-2 text-xs">
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">Family Unit</span>
                        {member.family_unit_name ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold bg-blue-50 text-[#0F294A] border border-blue-200 mt-0.5">
                            <Building className="w-3 h-3 text-amber-500" />
                            {member.family_unit_name}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-800 border border-amber-200 mt-0.5">
                            Unassigned
                          </span>
                        )}
                      </div>

                      {/* One-Tap Action Buttons (Mobile First Priority) */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${member.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0F294A] font-bold text-xs border border-blue-200 active:scale-95"
                          >
                            <Phone className="w-3.5 h-3.5 text-blue-600" />
                            <span>Call</span>
                          </a>

                          <a
                            href={getWhatsAppLink(member.phone, member.full_name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 active:scale-95"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                            <span>WhatsApp</span>
                          </a>
                        </div>

                        <button
                          onClick={() => setViewingMember(member)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
                        >
                          Details &rarr;
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* ===================== TAB 2: FAMILY UNITS GROUPING MANAGER ===================== */}
      {activeTab === 'family_units' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-[#0F294A]">Family Units & Home Cell Groups</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Organize members into fellowship cells based on halls and off-campus residences
              </p>
            </div>
            <button
              onClick={openNewFamilyModal}
              className="px-4 py-2.5 rounded-xl bg-[#0F294A] hover:bg-[#153A68] text-white font-bold text-xs sm:text-sm shadow flex items-center gap-2 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Create New Family Unit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {familyUnits.map((unit) => (
              <div
                key={unit.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F294A] flex items-center justify-center font-bold">
                      <Building className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditFamilyModal(unit)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#0F294A] hover:bg-slate-100"
                        title="Edit Unit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFamilyUnit(unit.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                        title="Delete Unit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-lg text-[#0F294A]">{unit.name}</h3>
                  <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                    <p>
                      <strong>Leader:</strong> {unit.leader_name}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <strong>Contact:</strong>
                      <a
                        href={`tel:${unit.leader_phone}`}
                        className="text-[#0F294A] hover:underline font-mono"
                      >
                        {unit.leader_phone}
                      </a>
                    </p>
                    {unit.meeting_info && (
                      <p className="text-slate-500 italic bg-slate-50 p-2 rounded-lg mt-2">
                        &quot;{unit.meeting_info}&quot;
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {unit.member_count || 0} Member{(unit.member_count || 0) === 1 ? '' : 's'}
                  </span>
                  <button
                    onClick={() => {
                      setFamilyFilter(unit.id);
                      setActiveTab('directory');
                    }}
                    className="text-xs font-bold text-[#0F294A] hover:text-amber-600 hover:underline"
                  >
                    View Members &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 3: DEMOGRAPHICS & ANALYTICS ===================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Year Level Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#0F294A] mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-500" />
                Distribution by Year Level
              </h3>
              <div className="space-y-3">
                {YEAR_LEVELS.map((lvl) => {
                  const count = stats?.levelBreakdown?.[lvl] || 0;
                  const total = stats?.totalMembers || 1;
                  const percent = Math.round((count / total) * 100);
                  return (
                    <div key={lvl}>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>{lvl}</span>
                        <span>{count} ({percent}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#0F294A] h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Department Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#0F294A] mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-500" />
                Distribution by Church Department
              </h3>
              <div className="space-y-3">
                {CHURCH_DEPARTMENTS.map((dept) => {
                  const count = stats?.departmentBreakdown?.[dept] || 0;
                  const total = stats?.totalMembers || 1;
                  const percent = Math.round((count / total) * 100);
                  return (
                    <div key={dept}>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>{dept}</span>
                        <span>{count} ({percent}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL: BULK ASSIGN TO FAMILY UNIT ===================== */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-lg text-[#0F294A]">Bulk Assign to Family Unit</h3>
              <button
                onClick={() => setShowBulkModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Assign <strong>{selectedMemberIds.length}</strong> selected member(s) to a Family Unit / Home Cell:
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Select Target Family Unit
                </label>
                <select
                  value={bulkTargetUnit}
                  onChange={(e) => setBulkTargetUnit(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#0F294A]"
                >
                  <option value="">-- Choose Family Unit --</option>
                  <option value="UNASSIGN">&bull; Set to Unassigned</option>
                  {familyUnits.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} (Leader: {u.leader_name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={bulkLoading || !bulkTargetUnit}
                  onClick={handleBulkAssign}
                  className="px-5 py-2.5 rounded-xl bg-[#0F294A] hover:bg-[#153A68] text-white font-bold text-xs shadow disabled:opacity-50 flex items-center gap-2"
                >
                  {bulkLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Apply Assignment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL: CREATE / EDIT FAMILY UNIT ===================== */}
      {showFamilyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-lg text-[#0F294A]">
                {editingFamilyUnit ? 'Edit Family Unit' : 'Create New Family Unit'}
              </h3>
              <button
                onClick={() => setShowFamilyModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFamilyUnit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Cell / Unit Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KT Hall Family Unit or Aboso Cell"
                  value={familyForm.name}
                  onChange={(e) => setFamilyForm({ ...familyForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#0F294A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Cell Leader Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eld. Emmanuel Ofori"
                  value={familyForm.leader_name}
                  onChange={(e) => setFamilyForm({ ...familyForm, leader_name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#0F294A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Leader Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +233541234567"
                  value={familyForm.leader_phone}
                  onChange={(e) => setFamilyForm({ ...familyForm, leader_phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#0F294A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Meeting Time / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sundays 4:30 PM @ KT Hall Lounge"
                  value={familyForm.meeting_info}
                  onChange={(e) => setFamilyForm({ ...familyForm, meeting_info: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#0F294A]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowFamilyModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingFamily}
                  className="px-5 py-2.5 rounded-xl bg-[#0F294A] hover:bg-[#153A68] text-white font-bold text-xs shadow flex items-center gap-2"
                >
                  {savingFamily ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Save Family Unit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== DRAWER / MODAL: MEMBER DETAIL & EDIT ===================== */}
      {viewingMember && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200">
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {viewingMember.membership_status}
                </span>
                <h2 className="text-xl font-black text-[#0F294A] mt-1.5">{viewingMember.full_name}</h2>
                <p className="text-xs text-slate-500">{viewingMember.year_level} &bull; {viewingMember.programme}</p>
              </div>
              <button
                onClick={() => {
                  setViewingMember(null);
                  setIsEditingMember(false);
                }}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Outreach Action Bar */}
            <div className="my-4 p-3 bg-slate-50 rounded-xl flex items-center justify-between gap-2 border border-slate-200/80">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${viewingMember.phone}`}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-50 text-[#0F294A] hover:bg-blue-100 text-xs font-bold border border-blue-200 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Call {viewingMember.phone}</span>
                </a>
                <a
                  href={getWhatsAppLink(viewingMember.phone, viewingMember.full_name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {!isEditingMember ? (
                <button
                  onClick={() => startEditMember(viewingMember)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingMember(false)}
                  className="text-xs font-semibold text-slate-500 hover:underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {/* VIEW MODE vs EDIT MODE */}
            {!isEditingMember ? (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Address</span>
                    <span className="font-semibold text-slate-800 break-all">{viewingMember.email}</span>
                  </div>

                  <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Date of Birth</span>
                    <span className="font-semibold text-slate-800">{viewingMember.dob}</span>
                  </div>

                  <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Hostel / Hall</span>
                    <span className="font-semibold text-slate-800">{viewingMember.hostel}</span>
                  </div>

                  <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Vacation Hometown</span>
                    <span className="font-semibold text-slate-800">{viewingMember.home_location}</span>
                  </div>

                  <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Church Department</span>
                    <span className="font-semibold text-[#0F294A]">{viewingMember.department}</span>
                  </div>

                  <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Family Unit</span>
                    <span className="font-semibold text-[#0F294A]">
                      {viewingMember.family_unit_name || 'Unassigned'}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => handleDeleteMember(viewingMember.id)}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Member</span>
                  </button>

                  <button
                    onClick={() => setViewingMember(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* EDIT FORM */
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editForm.full_name || ''}
                    onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-[#0F294A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Phone</label>
                    <input
                      type="text"
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-[#0F294A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Email</label>
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-[#0F294A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Year Level</label>
                    <select
                      value={editForm.year_level || ''}
                      onChange={(e) => setEditForm({ ...editForm, year_level: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-[#0F294A]"
                    >
                      {YEAR_LEVELS.map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Status</label>
                    <select
                      value={editForm.membership_status || ''}
                      onChange={(e) => setEditForm({ ...editForm, membership_status: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-[#0F294A]"
                    >
                      {MEMBERSHIP_STATUSES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Hostel / Hall</label>
                    <input
                      type="text"
                      value={editForm.hostel || ''}
                      onChange={(e) => setEditForm({ ...editForm, hostel: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-[#0F294A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Department</label>
                    <select
                      value={editForm.department || ''}
                      onChange={(e) => setEditForm({ ...editForm, department: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-[#0F294A]"
                    >
                      {CHURCH_DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Assign Family Unit</label>
                  <select
                    value={editForm.family_unit_id || ''}
                    onChange={(e) => setEditForm({ ...editForm, family_unit_id: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-[#0F294A]"
                  >
                    <option value="">Unassigned</option>
                    {familyUnits.map((u) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Vacation Hometown</label>
                  <input
                    type="text"
                    value={editForm.home_location || ''}
                    onChange={(e) => setEditForm({ ...editForm, home_location: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-[#0F294A]"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingMember(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={savingMember}
                    onClick={handleSaveMember}
                    className="px-5 py-2 rounded-xl bg-[#0F294A] hover:bg-[#153A68] text-white font-bold text-xs shadow flex items-center gap-1.5"
                  >
                    {savingMember && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
