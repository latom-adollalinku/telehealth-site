'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Medication {
  id: string;
  name: string;
  vialSize: number;
  defaultRecon: number;
  color: string;
  icon: string;
  description: string;
  maxWeeklyDose?: number;
  storageNote: string;
}

const MEDICATIONS: Medication[] = [
  {
    id: 'sema',
    name: 'Semaglutide',
    vialSize: 5,
    defaultRecon: 2.5,
    color: 'from-green-700 to-green-900',
    icon: 'W',
    description: 'Weekly weight management injection',
    maxWeeklyDose: 2.4,
    storageNote: 'Keep refrigerated. Do not freeze.',
  },
  {
    id: 'tirz',
    name: 'Tirzepatide',
    vialSize: 15,
    defaultRecon: 3,
    color: 'from-amber-700 to-amber-900',
    icon: 'W',
    description: 'Weekly weight management injection',
    maxWeeklyDose: 15,
    storageNote: 'Keep refrigerated. Do not freeze.',
  },
  {
    id: 'reta',
    name: 'Retatrutide',
    vialSize: 15,
    defaultRecon: 1.5,
    color: 'from-purple-700 to-purple-900',
    icon: 'W',
    description: 'Weekly weight management injection',
    maxWeeklyDose: 12,
    storageNote: 'Keep refrigerated. Do not freeze.',
  },
  {
    id: 'nad',
    name: 'NAD+',
    vialSize: 100,
    defaultRecon: 2,
    color: 'from-teal-700 to-teal-900',
    icon: 'L',
    description: 'Cellular energy & longevity support',
    storageNote: 'Keep refrigerated. Protect from light.',
  },
];

export default function DosingGuidePage() {
  const [selectedId, setSelectedId] = useState<string>('sema');
  const [reconVolume, setReconVolume] = useState<number>(2.5);
  const [targetDose, setTargetDose] = useState<string>('0.25');

  const med = MEDICATIONS.find((m) => m.id === selectedId)!;

  const handleMedChange = (id: string) => {
    const m = MEDICATIONS.find((x) => x.id === id)!;
    setSelectedId(id);
    setReconVolume(m.defaultRecon);
    setTargetDose('0.25');
  };

  const calculations = useMemo(() => {
    const doseNum = parseFloat(targetDose) || 0;
    const totalUnitsInVial = reconVolume * 100;
    const mgPerUnit = med.vialSize / totalUnitsInVial;
    const unitsToDraw = doseNum / mgPerUnit;
    const volumeToDraw = doseNum / (med.vialSize / reconVolume);
    const totalDosesPerVial = doseNum > 0 ? Math.floor(med.vialSize / doseNum) : 0;

    const isOverMax = med.maxWeeklyDose !== undefined && doseNum > med.maxWeeklyDose;

    return {
      mgPerUnit: mgPerUnit.toFixed(3),
      unitsToDraw: unitsToDraw.toFixed(1),
      volumeToDraw: volumeToDraw.toFixed(2),
      totalDosesPerVial,
      totalUnitsInVial,
      isOverMax,
    };
  }, [med, reconVolume, targetDose]);

  // Reference table: 5, 10, 15, 20, 25, 30, 35, 40 units
  const referenceRows = useMemo(() => {
    const mgPerUnit = med.vialSize / (reconVolume * 100);
    return [5, 10, 15, 20, 25, 30, 35, 40, 50].map((units) => ({
      units,
      mg: (units * mgPerUnit).toFixed(3),
    }));
  }, [med, reconVolume]);

  const unitsNum = parseFloat(calculations.unitsToDraw);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-6">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Educational Tool
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Medication Dosing Guide
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Use this tool to understand your prescribed dose. Always follow your physician&apos;s specific instructions.
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="mb-10 p-4 bg-amber-900/20 border border-amber-700/40 rounded-lg text-center">
          <p className="text-amber-300 text-sm font-medium">
            This is an educational tool only. Follow your physician&apos;s specific instructions. If your dose differs from what is shown here, use your physician&apos;s instructions.
          </p>
        </div>

        {/* Medication Picker */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#c9a84c] mb-4 tracking-widest uppercase">
            Select Your Medication
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MEDICATIONS.map((m) => (
              <button
                key={m.id}
                onClick={() => handleMedChange(m.id)}
                className={`p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedId === m.id
                    ? 'border-[#c9a84c] bg-gradient-to-br ' + m.color + ' shadow-lg'
                    : 'border-gray-700 bg-[#1a1a2e] hover:border-[#c9a84c]/50'
                }`}
              >
                <div className="text-lg font-bold text-white mb-1">{m.name}</div>
                <div className="text-xs text-gray-300 leading-snug">{m.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Calculator */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Input */}
          <div className="bg-[#1a1a2e] rounded-xl p-6 border border-[#2a2a4e]">
            <h2 className="font-serif text-xl font-bold text-white mb-6">Your Prescription</h2>

            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2">Vial Strength</label>
              <div className="text-2xl font-bold text-white">{med.vialSize} mg</div>
              <div className="text-xs text-gray-500 mt-1">This is the total mg in your vial</div>
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2">
                Bacteriostatic Water Added (mL)
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="10"
                value={reconVolume}
                onChange={(e) => setReconVolume(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white text-lg focus:border-[#c9a84c] focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Check your pharmacy label or physician instructions for this number
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2">
                My Prescribed Dose (mg)
              </label>
              <input
                type="number"
                step="0.05"
                min="0"
                value={targetDose}
                onChange={(e) => setTargetDose(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white text-lg focus:border-[#c9a84c] focus:outline-none"
              />
              {med.maxWeeklyDose && (
                <p className="text-xs text-amber-400 mt-1">
                  Maximum per week: {med.maxWeeklyDose} mg
                </p>
              )}
            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0d0d1a] rounded-xl p-6 border border-[#c9a84c]/50">
            <h2 className="font-serif text-xl font-bold text-[#c9a84c] mb-6">How Much to Draw</h2>

            {/* Big display */}
            <div className="text-center py-8 mb-6 bg-[#0a0a0a]/60 rounded-xl border border-[#c9a84c]/20">
              <div className="text-7xl font-bold text-white mb-1">
                {calculations.unitsToDraw}
              </div>
              <div className="text-[#c9a84c] font-semibold tracking-widest uppercase text-sm">
                Units on Insulin Syringe
              </div>
            </div>

            {/* Visual syringe */}
            <div className="mb-6">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 text-center">
                Syringe Visual (U-100)
              </div>
              <div className="relative h-10 bg-[#0a0a0a] rounded-full border border-gray-700 overflow-hidden mx-4">
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#c9a84c] to-[#e0c070] rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (unitsNum / 100) * 100)}%`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white drop-shadow">
                    {calculations.unitsToDraw} units
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 px-4 mt-1">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>

            {/* Confirmation */}
            <div className="p-4 bg-[#0a0a0a]/60 rounded-lg border border-[#2a2a4e] text-center mb-4">
              <p className="text-gray-300 text-sm">
                This gives you <span className="text-white font-bold">{targetDose} mg</span> of {med.name}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                ({calculations.volumeToDraw} mL &bull; {calculations.mgPerUnit} mg per unit)
              </p>
            </div>

            {calculations.isOverMax && (
              <div className="p-3 bg-red-900/30 border border-red-600/50 rounded-lg text-center">
                <p className="text-red-400 text-xs font-semibold">
                  This dose exceeds the maximum weekly dose of {med.maxWeeklyDose} mg. Contact your physician.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reference Table */}
        <div className="mb-10 bg-[#1a1a2e] rounded-xl p-6 border border-[#2a2a4e]">
          <h2 className="font-serif text-xl font-bold text-white mb-2">Quick Reference Table</h2>
          <p className="text-gray-500 text-sm mb-6">
            {med.name} &bull; {reconVolume}mL BAC water &bull; {calculations.mgPerUnit} mg per unit
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-9 gap-2 text-center">
            {referenceRows.map((row) => (
              <div
                key={row.units}
                className={`bg-[#0a0a0a] border rounded-lg p-3 transition-colors ${
                  Math.abs(parseFloat(calculations.unitsToDraw) - row.units) < 0.5
                    ? 'border-[#c9a84c] bg-[#c9a84c]/5'
                    : 'border-gray-800 hover:border-[#c9a84c]/30'
                }`}
              >
                <div className="text-xs text-gray-500">{row.units}u</div>
                <div className="text-sm font-bold text-white">{row.mg}</div>
                <div className="text-xs text-gray-600">mg</div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mb-10 grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: '🧊',
              title: 'Store Refrigerated',
              detail: med.storageNote,
            },
            {
              icon: '💉',
              title: 'Rotate Injection Sites',
              detail: 'Alternate between abdomen, thigh, and upper arm each week.',
            },
            {
              icon: '📞',
              title: 'Questions?',
              detail: 'Contact your provider before changing your dose.',
            },
          ].map((tip, i) => (
            <div key={i} className="p-5 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl">
              <div className="text-2xl mb-2">{tip.icon}</div>
              <div className="text-white font-semibold text-sm mb-1">{tip.title}</div>
              <div className="text-gray-400 text-xs leading-relaxed">{tip.detail}</div>
            </div>
          ))}
        </div>

        {/* Full disclaimer */}
        <div className="mb-10 p-6 bg-amber-900/10 border border-amber-700/30 rounded-xl">
          <h3 className="text-amber-400 font-semibold mb-2 text-sm uppercase tracking-wider">
            Medical Disclaimer
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            This dosing guide is for educational purposes only. It does not constitute medical advice.
            Always follow the specific instructions provided by your prescribing physician.
            Dosing calculations assume a U-100 insulin syringe. If you are using a different syringe,
            your measurements will differ. If you have any questions about your prescription, contact
            your provider before injecting.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center p-8 bg-gradient-to-br from-[#1a1a2e] to-[#13132a] border border-[#c9a84c]/20 rounded-2xl">
          <h3 className="font-serif text-2xl font-bold text-white mb-3">
            Need a Prescription?
          </h3>
          <p className="text-gray-400 mb-6">
            Start your free consultation with a board-certified physician.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
          >
            Start Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
