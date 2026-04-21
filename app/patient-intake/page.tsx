'use client';

import { useMemo, useState } from 'react';

// ---------------------------------------------------------------------------
// Services + form schema
// ---------------------------------------------------------------------------

type ServiceId =
  | 'weight-management'
  | 'peptide-therapy'
  | 'hormone-optimization'
  | 'surgical-preop'
  | 'general-wellness';

const SERVICES: { id: ServiceId; label: string; tagline: string }[] = [
  { id: 'weight-management', label: 'Weight Management', tagline: 'GLP-1, peptides, metabolic health' },
  { id: 'peptide-therapy', label: 'Peptide Therapy', tagline: 'BPC-157, TB-500, recovery & performance' },
  { id: 'hormone-optimization', label: 'Hormone Optimization', tagline: 'Energy, mood, libido, sleep' },
  { id: 'surgical-preop', label: 'Surgical Preoperative Optimization', tagline: 'Anesthesiologist-led surgical prep' },
  { id: 'general-wellness', label: 'General Wellness Consultation', tagline: 'Longevity, performance, overall health' },
];

type FormResponses = Record<string, string | string[] | number>;

// ---------------------------------------------------------------------------
// Reusable styled inputs
// ---------------------------------------------------------------------------

const labelBase = 'block text-sm font-medium text-gray-300 mb-2';
const inputBase =
  'w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded text-white focus:outline-none focus:border-[#c9a84c] transition';

function TextField(props: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: 'text' | 'number' | 'date' | 'tel' | 'email';
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <label className={labelBase}>
        {props.label}
        {props.required && <span className="text-[#c9a84c] ml-1">*</span>}
      </label>
      <input
        type={props.type ?? 'text'}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        required={props.required}
        min={props.min}
        max={props.max}
        className={inputBase}
      />
    </div>
  );
}

function TextArea(props: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelBase}>
        {props.label}
        {props.required && <span className="text-[#c9a84c] ml-1">*</span>}
      </label>
      <textarea
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        rows={props.rows ?? 3}
        required={props.required}
        className={`${inputBase} resize-none`}
      />
    </div>
  );
}

function RadioGroup(props: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelBase}>
        {props.label}
        {props.required && <span className="text-[#c9a84c] ml-1">*</span>}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {props.options.map((opt) => {
          const active = props.value === opt;
          return (
            <label
              key={opt}
              className={`flex items-center gap-3 px-4 py-3 rounded border cursor-pointer transition select-none ${
                active
                  ? 'bg-[#c9a84c]/10 border-[#c9a84c] text-white'
                  : 'bg-[#0a0a0a] border-[#c9a84c]/30 text-gray-300 hover:border-[#c9a84c]/60'
              }`}
            >
              <input
                type="radio"
                name={props.name}
                value={opt}
                checked={active}
                onChange={() => props.onChange(opt)}
                className="accent-[#c9a84c] w-4 h-4"
                required={props.required}
              />
              <span className="text-sm">{opt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function CheckboxGroup(props: {
  label: string;
  name: string;
  values: string[];
  options: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    const next = props.values.includes(opt)
      ? props.values.filter((v) => v !== opt)
      : [...props.values, opt];
    props.onChange(next);
  };

  return (
    <div>
      <label className={labelBase}>{props.label}</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {props.options.map((opt) => {
          const active = props.values.includes(opt);
          return (
            <label
              key={opt}
              className={`flex items-center gap-3 px-4 py-3 rounded border cursor-pointer transition select-none ${
                active
                  ? 'bg-[#c9a84c]/10 border-[#c9a84c] text-white'
                  : 'bg-[#0a0a0a] border-[#c9a84c]/30 text-gray-300 hover:border-[#c9a84c]/60'
              }`}
            >
              <input
                type="checkbox"
                name={props.name}
                checked={active}
                onChange={() => toggle(opt)}
                className="accent-[#c9a84c] w-4 h-4"
              />
              <span className="text-sm">{opt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Slider(props: {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-300">{props.label}</label>
        <span className="text-[#c9a84c] font-semibold text-lg tabular-nums">{props.value}</span>
      </div>
      <input
        type="range"
        name={props.name}
        min={props.min}
        max={props.max}
        step={props.step ?? 1}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#0a0a0a] border border-[#c9a84c]/30 accent-[#c9a84c]"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{props.min}</span>
        {props.hint && <span>{props.hint}</span>}
        <span>{props.max}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Initial state per service
// ---------------------------------------------------------------------------

function initialResponses(service: ServiceId): FormResponses {
  switch (service) {
    case 'weight-management':
      return {
        currentWeight: '',
        goalWeight: '',
        height: '',
        currentDiet: '',
        exerciseFrequency: '',
        previousAttempts: [],
        medicationsAffectingWeight: '',
        primaryGoal: '',
        triedBefore: [],
      };
    case 'peptide-therapy':
      return {
        previousExperience: '',
        specificGoals: [],
        currentSupplements: '',
        allergies: '',
        healthConditions: '',
        injectionComfort: '',
        timeline: '',
      };
    case 'hormone-optimization':
      return {
        energyLevel: 5,
        moodStability: 5,
        libido: 5,
        sleepQuality: 5,
        currentHormonalMeds: '',
        symptoms: [],
        bloodWork: '',
        primaryConcern: '',
      };
    case 'surgical-preop':
      return {
        surgeryDate: '',
        typeOfSurgery: '',
        surgeonHospital: '',
        previousSurgeries: '',
        currentMedications: '',
        currentSupplements: '',
        allergies: '',
        bleedingDisorders: '',
        bloodThinners: '',
        nsaidsUsed: '',
        herbalSupplements: [],
        healthConditions: '',
        goals: [],
      };
    case 'general-wellness':
      return {
        healthGoals: [],
        currentConcerns: '',
        sleepHours: 7,
        exerciseFrequency: '',
        stressLevel: 5,
        currentMedications: '',
        majorHealthEvents: '',
        successLookLike: '',
      };
  }
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function PatientIntakePage() {
  const [service, setService] = useState<ServiceId | ''>('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [responses, setResponses] = useState<FormResponses>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeService = service === '' ? null : service;

  const update = <K extends string>(key: K, value: FormResponses[string]) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  };

  const onServiceChange = (next: ServiceId) => {
    setService(next);
    setResponses(initialResponses(next));
    setErrorMsg(null);
    setSubmitted(false);
  };

  const totalSteps = activeService ? 3 : 1;
  const currentStep = useMemo(() => {
    if (!activeService) return 1;
    if (!patientName || !patientEmail) return 2;
    return 3;
  }, [activeService, patientName, patientEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeService) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/sheets/log-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: activeService,
          patientName,
          patientEmail,
          patientPhone,
          formResponses: responses,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong submitting your intake. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Patient Intake
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Share a few details so Dr. Abdulhakim can prepare for your consultation.
            <br />
            <span className="text-[#c9a84c]">All responses are confidential.</span>
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="relative pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d1a]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-10 text-center">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center">
                <span className="text-[#c9a84c] text-2xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Thank you, {patientName.split(' ')[0] || 'there'}.</h2>
              <p className="text-gray-300 mb-6">
                Your intake has been received. Dr. Abdulhakim will review your responses before your consultation.
                A confirmation has been sent to <span className="text-[#c9a84c]">{patientEmail}</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/book"
                  className="px-6 py-3 bg-[#c9a84c] text-black font-semibold rounded hover:bg-[#e0c070] transition"
                >
                  Book a Consultation
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setService('');
                    setPatientName('');
                    setPatientEmail('');
                    setPatientPhone('');
                    setResponses({});
                  }}
                  className="px-6 py-3 border border-[#c9a84c]/40 text-[#c9a84c] font-semibold rounded hover:bg-[#c9a84c]/10 transition"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Progress */}
              <div className="flex items-center justify-between bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg px-5 py-3">
                <div className="text-xs uppercase tracking-wider text-gray-500">
                  Step {currentStep} of {totalSteps}
                </div>
                <div className="flex-1 mx-4 h-1 rounded bg-[#0a0a0a] overflow-hidden">
                  <div
                    className="h-full bg-[#c9a84c] transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-[#c9a84c] font-semibold">
                  {currentStep === 1 ? 'Service' : currentStep === 2 ? 'Contact' : 'Health'}
                </div>
              </div>

              {/* Step 1: Service selector */}
              <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-6 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-2">1. Which service is this for?</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Pick the service that best matches why you&apos;re reaching out. Each has its own intake questions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => {
                    const active = service === s.id;
                    return (
                      <label
                        key={s.id}
                        className={`flex flex-col gap-1 px-4 py-4 rounded border cursor-pointer transition select-none ${
                          active
                            ? 'bg-[#c9a84c]/10 border-[#c9a84c]'
                            : 'bg-[#0a0a0a] border-[#c9a84c]/30 hover:border-[#c9a84c]/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="service"
                            value={s.id}
                            checked={active}
                            onChange={() => onServiceChange(s.id)}
                            className="accent-[#c9a84c] w-4 h-4"
                          />
                          <span className={`font-semibold text-sm ${active ? 'text-white' : 'text-gray-200'}`}>
                            {s.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 ml-7">{s.tagline}</p>
                      </label>
                    );
                  })}
                </div>
              </div>

              {activeService && (
                <>
                  {/* Step 2: Patient contact */}
                  <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-white mb-2">2. Your contact info</h2>
                    <p className="text-gray-400 text-sm mb-6">
                      If you already booked through Cal.com, confirm the same name and email here.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <TextField
                        label="Full name"
                        name="patientName"
                        value={patientName}
                        onChange={setPatientName}
                        required
                        placeholder="Jane Doe"
                      />
                      <TextField
                        label="Email"
                        name="patientEmail"
                        type="email"
                        value={patientEmail}
                        onChange={setPatientEmail}
                        required
                        placeholder="you@example.com"
                      />
                      <TextField
                        label="Phone"
                        name="patientPhone"
                        type="tel"
                        value={patientPhone}
                        onChange={setPatientPhone}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Step 3: Service-specific form */}
                  <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-6 sm:p-8 space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-2">
                        3. {SERVICES.find((s) => s.id === activeService)?.label} intake
                      </h2>
                      <p className="text-gray-400 text-sm">
                        These answers help Dr. Abdulhakim tailor your consultation. Be as specific as you can.
                      </p>
                    </div>

                    {activeService === 'weight-management' && (
                      <WeightManagementForm responses={responses} update={update} />
                    )}
                    {activeService === 'peptide-therapy' && (
                      <PeptideTherapyForm responses={responses} update={update} />
                    )}
                    {activeService === 'hormone-optimization' && (
                      <HormoneOptimizationForm responses={responses} update={update} />
                    )}
                    {activeService === 'surgical-preop' && (
                      <SurgicalPreopForm responses={responses} update={update} />
                    )}
                    {activeService === 'general-wellness' && (
                      <GeneralWellnessForm responses={responses} update={update} />
                    )}
                  </div>

                  {errorMsg && (
                    <div className="bg-red-900/20 border border-red-500/40 rounded p-4 text-red-300 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting…' : 'Submit Intake'}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to our{' '}
                    <a href="/privacy" className="text-[#c9a84c] hover:underline">
                      privacy policy
                    </a>
                    . Your responses are encrypted in transit and reviewed only by your clinician.
                  </p>
                </>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Per-service form bodies
// ---------------------------------------------------------------------------

type FormProps = {
  responses: FormResponses;
  update: (key: string, value: FormResponses[string]) => void;
};

function str(v: FormResponses[string] | undefined): string {
  return typeof v === 'string' ? v : v === undefined ? '' : String(v);
}
function arr(v: FormResponses[string] | undefined): string[] {
  return Array.isArray(v) ? v : [];
}
function num(v: FormResponses[string] | undefined, fallback: number): number {
  return typeof v === 'number' ? v : fallback;
}

function WeightManagementForm({ responses, update }: FormProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <TextField
          label="Current weight (lb)"
          name="currentWeight"
          type="number"
          value={str(responses.currentWeight)}
          onChange={(v) => update('currentWeight', v)}
          placeholder="185"
          required
        />
        <TextField
          label="Goal weight (lb)"
          name="goalWeight"
          type="number"
          value={str(responses.goalWeight)}
          onChange={(v) => update('goalWeight', v)}
          placeholder="165"
          required
        />
        <TextField
          label="Height (optional)"
          name="height"
          value={str(responses.height)}
          onChange={(v) => update('height', v)}
          placeholder="5'10&quot; or 178 cm"
        />
      </div>

      <RadioGroup
        label="Current diet approach"
        name="currentDiet"
        value={str(responses.currentDiet)}
        onChange={(v) => update('currentDiet', v)}
        options={['Keto', 'Low-carb', 'Balanced', 'Other']}
        required
      />

      <RadioGroup
        label="Exercise frequency"
        name="exerciseFrequency"
        value={str(responses.exerciseFrequency)}
        onChange={(v) => update('exerciseFrequency', v)}
        options={['None', '1-2x per week', '3-4x per week', '5+ times per week']}
        required
      />

      <CheckboxGroup
        label="Previous weight loss attempts (select all that apply)"
        name="previousAttempts"
        values={arr(responses.previousAttempts)}
        onChange={(v) => update('previousAttempts', v)}
        options={['None', 'Diet only', 'Exercise', 'Supplements', 'Medical intervention']}
      />

      <TextArea
        label="Current medications affecting weight"
        name="medicationsAffectingWeight"
        value={str(responses.medicationsAffectingWeight)}
        onChange={(v) => update('medicationsAffectingWeight', v)}
        placeholder="e.g., steroids, antidepressants, beta-blockers, insulin"
      />

      <RadioGroup
        label="Primary goal"
        name="primaryGoal"
        value={str(responses.primaryGoal)}
        onChange={(v) => update('primaryGoal', v)}
        options={['Fat loss', 'Muscle gain', 'Energy', 'Health']}
        required
      />

      <CheckboxGroup
        label="Have you tried any of these?"
        name="triedBefore"
        values={arr(responses.triedBefore)}
        onChange={(v) => update('triedBefore', v)}
        options={['Ozempic', 'GLP-1 (other)', 'Keto', 'Intermittent fasting', 'Supplements']}
      />
    </>
  );
}

function PeptideTherapyForm({ responses, update }: FormProps) {
  return (
    <>
      <RadioGroup
        label="Previous peptide experience"
        name="previousExperience"
        value={str(responses.previousExperience)}
        onChange={(v) => update('previousExperience', v)}
        options={['Never', 'BPC-157', 'TB-500', 'AOD-9604', 'Other']}
        required
      />

      <CheckboxGroup
        label="Specific goals (select all that apply)"
        name="specificGoals"
        values={arr(responses.specificGoals)}
        onChange={(v) => update('specificGoals', v)}
        options={['Muscle gain', 'Fat loss', 'Recovery', 'Joint health', 'Longevity', 'Athletic performance']}
      />

      <TextArea
        label="Current supplements and medications"
        name="currentSupplements"
        value={str(responses.currentSupplements)}
        onChange={(v) => update('currentSupplements', v)}
        placeholder="List all supplements and prescribed medications you currently take"
      />

      <TextArea
        label="Allergies or sensitivities"
        name="allergies"
        value={str(responses.allergies)}
        onChange={(v) => update('allergies', v)}
        placeholder="Food, medication, or environmental allergies"
      />

      <TextArea
        label="Health conditions we should be aware of"
        name="healthConditions"
        value={str(responses.healthConditions)}
        onChange={(v) => update('healthConditions', v)}
        placeholder="e.g., autoimmune, diabetes, thyroid, cancer history"
      />

      <RadioGroup
        label="Injection comfort level"
        name="injectionComfort"
        value={str(responses.injectionComfort)}
        onChange={(v) => update('injectionComfort', v)}
        options={['Very comfortable', 'Somewhat comfortable', 'First time', 'Prefer oral']}
        required
      />

      <RadioGroup
        label="Timeline to start"
        name="timeline"
        value={str(responses.timeline)}
        onChange={(v) => update('timeline', v)}
        options={['ASAP', 'Within 1 month', 'Flexible']}
        required
      />
    </>
  );
}

function HormoneOptimizationForm({ responses, update }: FormProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Slider
          label="Energy level"
          name="energyLevel"
          value={num(responses.energyLevel, 5)}
          min={1}
          max={10}
          onChange={(v) => update('energyLevel', v)}
          hint="1 = exhausted, 10 = peak"
        />
        <Slider
          label="Mood / emotional stability"
          name="moodStability"
          value={num(responses.moodStability, 5)}
          min={1}
          max={10}
          onChange={(v) => update('moodStability', v)}
          hint="1 = very low, 10 = stable"
        />
        <Slider
          label="Libido"
          name="libido"
          value={num(responses.libido, 5)}
          min={1}
          max={10}
          onChange={(v) => update('libido', v)}
          hint="1 = none, 10 = high"
        />
        <Slider
          label="Sleep quality"
          name="sleepQuality"
          value={num(responses.sleepQuality, 5)}
          min={1}
          max={10}
          onChange={(v) => update('sleepQuality', v)}
          hint="1 = poor, 10 = restorative"
        />
      </div>

      <TextArea
        label="Current hormonal medications"
        name="currentHormonalMeds"
        value={str(responses.currentHormonalMeds)}
        onChange={(v) => update('currentHormonalMeds', v)}
        placeholder="TRT, thyroid, birth control, HCG, etc."
      />

      <CheckboxGroup
        label="Symptoms (select all that apply)"
        name="symptoms"
        values={arr(responses.symptoms)}
        onChange={(v) => update('symptoms', v)}
        options={[
          'Brain fog',
          'Fatigue',
          'Low libido',
          'Mood swings',
          'Poor sleep',
          'Weight gain',
          'Muscle loss',
          'Hot flashes',
        ]}
      />

      <RadioGroup
        label="Current blood work available?"
        name="bloodWork"
        value={str(responses.bloodWork)}
        onChange={(v) => update('bloodWork', v)}
        options={['Yes', 'No', 'Will do before appointment']}
        required
      />

      <TextArea
        label="Primary concern"
        name="primaryConcern"
        value={str(responses.primaryConcern)}
        onChange={(v) => update('primaryConcern', v)}
        placeholder="What's the single most important thing you want to address?"
        required
      />
    </>
  );
}

function SurgicalPreopForm({ responses, update }: FormProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField
          label="Surgery date"
          name="surgeryDate"
          type="date"
          value={str(responses.surgeryDate)}
          onChange={(v) => update('surgeryDate', v)}
          required
        />
        <TextField
          label="Type of surgery"
          name="typeOfSurgery"
          value={str(responses.typeOfSurgery)}
          onChange={(v) => update('typeOfSurgery', v)}
          placeholder="e.g., knee replacement, ACL repair, cholecystectomy"
          required
        />
      </div>

      <TextField
        label="Surgeon / hospital (optional)"
        name="surgeonHospital"
        value={str(responses.surgeonHospital)}
        onChange={(v) => update('surgeonHospital', v)}
        placeholder="Dr. Smith — VCU Medical Center"
      />

      <TextArea
        label="Previous surgeries"
        name="previousSurgeries"
        value={str(responses.previousSurgeries)}
        onChange={(v) => update('previousSurgeries', v)}
        placeholder="List prior surgeries and any anesthesia reactions"
      />

      <TextArea
        label="Current medications (CRITICAL — list everything)"
        name="currentMedications"
        value={str(responses.currentMedications)}
        onChange={(v) => update('currentMedications', v)}
        placeholder="Include prescription drugs, dosages, and frequency"
        required
      />

      <TextArea
        label="Current supplements (CRITICAL — list everything)"
        name="currentSupplements"
        value={str(responses.currentSupplements)}
        onChange={(v) => update('currentSupplements', v)}
        placeholder="Vitamins, herbs, protein powders, nootropics — all of it"
        required
      />

      <TextArea
        label="Allergies"
        name="allergies"
        value={str(responses.allergies)}
        onChange={(v) => update('allergies', v)}
        placeholder="Medications, latex, contrast, food"
      />

      <RadioGroup
        label="History of bleeding disorders?"
        name="bleedingDisorders"
        value={str(responses.bleedingDisorders)}
        onChange={(v) => update('bleedingDisorders', v)}
        options={['Yes', 'No']}
        required
      />

      <RadioGroup
        label="Blood thinners"
        name="bloodThinners"
        value={str(responses.bloodThinners)}
        onChange={(v) => update('bloodThinners', v)}
        options={['None', 'Aspirin', 'Warfarin', 'Other']}
        required
      />

      <RadioGroup
        label="NSAIDs used"
        name="nsaidsUsed"
        value={str(responses.nsaidsUsed)}
        onChange={(v) => update('nsaidsUsed', v)}
        options={['None', 'Ibuprofen', 'Naproxen', 'Other']}
        required
      />

      <CheckboxGroup
        label="Herbal supplements (select all that apply)"
        name="herbalSupplements"
        values={arr(responses.herbalSupplements)}
        onChange={(v) => update('herbalSupplements', v)}
        options={['Ginger', 'Garlic', "St. John's Wort", 'Ginseng', 'Fish oil', 'Turmeric', 'Other']}
      />

      <TextArea
        label="Health conditions"
        name="healthConditions"
        value={str(responses.healthConditions)}
        onChange={(v) => update('healthConditions', v)}
        placeholder="Diabetes, hypertension, heart condition, sleep apnea, etc."
      />

      <CheckboxGroup
        label="Your goal for preoperative optimization"
        name="goals"
        values={arr(responses.goals)}
        onChange={(v) => update('goals', v)}
        options={['Optimize recovery', 'Reduce bleeding', 'Improve healing', 'Reduce infection risk']}
      />
    </>
  );
}

function GeneralWellnessForm({ responses, update }: FormProps) {
  return (
    <>
      <CheckboxGroup
        label="Health goals (select all that apply)"
        name="healthGoals"
        values={arr(responses.healthGoals)}
        onChange={(v) => update('healthGoals', v)}
        options={['Energy', 'Sleep', 'Stress management', 'Longevity', 'Performance', 'General health']}
      />

      <TextArea
        label="Current health concerns"
        name="currentConcerns"
        value={str(responses.currentConcerns)}
        onChange={(v) => update('currentConcerns', v)}
        placeholder="What's been bothering you? Symptoms, worries, anything you want addressed"
      />

      <Slider
        label="Sleep hours per night"
        name="sleepHours"
        value={num(responses.sleepHours, 7)}
        min={1}
        max={12}
        onChange={(v) => update('sleepHours', v)}
        hint="hours"
      />

      <RadioGroup
        label="Exercise frequency"
        name="exerciseFrequency"
        value={str(responses.exerciseFrequency)}
        onChange={(v) => update('exerciseFrequency', v)}
        options={['None', '1-2x per week', '3-4x per week', '5+ per week']}
        required
      />

      <Slider
        label="Stress level"
        name="stressLevel"
        value={num(responses.stressLevel, 5)}
        min={1}
        max={10}
        onChange={(v) => update('stressLevel', v)}
        hint="1 = calm, 10 = overwhelmed"
      />

      <TextArea
        label="Current medications"
        name="currentMedications"
        value={str(responses.currentMedications)}
        onChange={(v) => update('currentMedications', v)}
        placeholder="Everything you take regularly"
      />

      <TextArea
        label="Major health events in past 2 years (optional)"
        name="majorHealthEvents"
        value={str(responses.majorHealthEvents)}
        onChange={(v) => update('majorHealthEvents', v)}
        placeholder="Hospitalizations, diagnoses, surgeries, significant events"
      />

      <TextArea
        label="What would success look like?"
        name="successLookLike"
        value={str(responses.successLookLike)}
        onChange={(v) => update('successLookLike', v)}
        placeholder="In 6 months, if this is working, what's different?"
        required
      />
    </>
  );
}
